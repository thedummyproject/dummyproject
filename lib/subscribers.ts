const ADDRESS = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export type Subscriber = {
  email: string;
  submittedAt: string;
};

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length === 0 || email.length > 254) return null;
  return ADDRESS.test(email) ? email : null;
}

/**
 * Persistence seam: forwards the validated email to the Google Apps Script Web App,
 * which appends the row (with its own timestamp) to Google Sheets and sends the
 * notification email. The URL stays server-side; only this module knows about it.
 */
export async function saveSubscriber(email: string): Promise<void> {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

  if (!webAppUrl) {
    throw new Error("GOOGLE_SHEETS_WEB_APP_URL is not configured.");
  }

  const body = new URLSearchParams({ email });

  const response = await fetch(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
    cache: "no-store",
    redirect: "follow",
  });

  const result = await response.text();

  if (!response.ok || result.trim().toLowerCase() !== "success") {
    throw new Error(
      `Google Sheets submission failed: ${response.status} ${result}`,
    );
  }
}
