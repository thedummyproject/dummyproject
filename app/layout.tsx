import type { Metadata, Viewport } from "next";
import { Poppins, Source_Serif_4 } from "next/font/google";
import { copy } from "@/lib/site";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  variable: "--font-display-src",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: copy.pageTitle,
  description: copy.pageDescription,

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: copy.pageTitle,
    description: copy.pageDescription,
    siteName: copy.name,
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/assets/unfurl.png",
        width: 968,
        height: 870,
        alt: "The Dumb Project",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: copy.pageTitle,
    description: copy.pageDescription,
    images: ["/assets/unfurl.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#cbcbce",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
