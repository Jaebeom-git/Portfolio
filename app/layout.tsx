import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/src/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.owner}`,
  },
  description: site.description,
  authors: [{ name: site.owner }],
  creator: site.owner,
  verification: {
    google: "RbTN67xpVb8uU9nixGfDyQRr-rWaCJvQKh0GnuVEToI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    images: [
      {
        url: site.image,
        width: 1080,
        height: 1080,
        alt: "Jaebeom Jo profile image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.image],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
