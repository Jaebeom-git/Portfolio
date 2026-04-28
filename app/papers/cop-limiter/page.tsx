import type { Metadata } from "next";
import Link from "next/link";
import { copLimiterProject } from "@/src/lib/copLimiterProjectPage";
import { absoluteUrl } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "CoP-Limiter page moved",
  description: "The CoP-Limiter project page has moved to the projects section.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  alternates: {
    canonical: absoluteUrl(copLimiterProject.routePath),
  },
};

export default function MovedCopLimiterPage() {
  return (
    <main className="section-shell not-found">
      <p className="eyebrow">Moved</p>
      <h1>CoP-Limiter project page moved.</h1>
      <p>The canonical project page now lives under the Project section.</p>
      <Link className="button primary" href={copLimiterProject.routePath}>
        Open CoP-Limiter project
      </Link>
    </main>
  );
}
