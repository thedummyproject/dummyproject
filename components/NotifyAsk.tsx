"use client";

import { useState, type FormEvent } from "react";
import { copy } from "@/lib/site";

type Status = "idle" | "done" | "error";

const ADDRESS = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function NotifyAsk() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const done = status === "done";
  const wrong = status === "error";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (done) return;

    const value = email.trim();
    if (!ADDRESS.test(value)) {
      setStatus("error");
      setMessage("That email address doesn't look right. Check it and try again.");
      return;
    }

    // Confirm immediately; persistence happens in the background and should not
    // make the visitor wait for a third-party response.
    setStatus("done");
    setMessage(copy.success);

    void fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
      keepalive: true,
    }).catch(() => undefined);
  }

  return (
    <>
      <p
        id="notify-status"
        className={
          done ? "prompt prompt--success" : wrong ? "prompt prompt--wrong" : "prompt"
        }
        aria-live="polite"
      >
        {message ?? copy.prompt}
      </p>

      <form
        className={done ? "notify notify--done" : "notify"}
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="sr-only" htmlFor="notify-email">
          Email address
        </label>
        <input
          id="notify-email"
          className="notify__field"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder={copy.placeholder}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (wrong) {
              setStatus("idle");
              setMessage(null);
            }
          }}
          readOnly={done}
          disabled={done}
          aria-invalid={wrong}
          aria-describedby="notify-status"
        />
        <button
          className="notify__action"
          type="submit"
          disabled={done}
        >
          {done ? <Check /> : null}
          <span>{done ? copy.sent : copy.action}</span>
        </button>
      </form>
    </>
  );
}

function Check() {
  return (
    <svg
      className="notify__check"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path pathLength={1} d="M3 8.5 6.4 12 13 4.5" />
    </svg>
  );
}
