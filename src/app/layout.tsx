import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://linkedinformatter.io";
const title = "LinkedIn Text Formatter";
const description =
  "Format your LinkedIn posts with bold, italic, underlined, strikethrough text and emoji — for free. Copy and paste ready.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    "LinkedIn",
    "text formatter",
    "bold text",
    "italic text",
    "underline text",
    "strikethrough",
    "unicode text",
    "LinkedIn post formatter",
    "social media tools",
    "free",
  ],
  authors: [{ name: "Jonathan Chew", url: "https://www.linkedin.com/in/jonathanchew/" }],
  creator: "Jonathan Chew",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LinkedIn Formatter",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "website",
    siteName: title,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a66c2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
