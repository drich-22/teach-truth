import type { Metadata } from "next";
import { Inter_Tight, Plus_Jakarta_Sans } from "next/font/google";
import { ClientReviewHost } from "@/components/review/ClientReviewHost";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/** Narrower display face — Syne read too wide at hero scale */
const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Teacher-Driven Education Reform`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder.name, url: `${siteConfig.url}/ruth` }],
  creator: siteConfig.founder.name,
  keywords: [
    "education reform",
    "public education",
    "Save USA Public Education",
    "Ruth Lerno",
    "Teacher Truth with Ruth",
    "Teach Truth",
    "teacher-driven reform",
    "teaching for mastery",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Teacher-Driven Education Reform`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.founder.image,
        width: 640,
        height: 640,
        alt: `${siteConfig.founder.name} — ${siteConfig.podcast.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Classroom-Led Education Reform`,
    description: siteConfig.description,
    images: [siteConfig.founder.image],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ClientReviewHost />
      </body>
    </html>
  );
}
