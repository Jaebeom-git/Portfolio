import type { Metadata } from "next";
import { copLimiterProject, copLimiterJsonLd, getCopLimiterProjectPage } from "@/src/lib/copLimiterProjectPage";
import { absoluteUrl } from "@/src/lib/site";

const title = "MAISE: Joint Torque Estimation for Passive Sarcopenia Monitoring | Paper + Code";
const description =
  "Project page for the paper ‘Joint torque estimation from daily living motion for passive sarcopenia monitoring in older adults,’ featuring MAISE and the CoP-constrained GRF-estimation code used for downstream torque analysis.";
const keywords = [...copLimiterProject.keywords];

export const metadata: Metadata = {
  title,
  description,
  keywords,
  authors: [
    { name: "Jaebeom Jo" },
    { name: "Kihyun Kim" },
    { name: "Min-gu Kang" },
    { name: "Kanghyun Ryu" },
    { name: "Junhyoung Ha" },
    { name: "Jiyeon Kang" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: absoluteUrl(copLimiterProject.routePath),
  },
  openGraph: {
    type: "website",
    title,
    description: "Project page for MAISE and the CoP-constrained GRF-estimation code used to support motion-based joint torque analysis.",
    url: absoluteUrl(copLimiterProject.routePath),
    images: [{ url: absoluteUrl("/papers/cop-limiter/figure-1-app.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Project page for MAISE and the CoP-constrained GRF-estimation code used to support motion-based joint torque analysis.",
    images: [absoluteUrl("/papers/cop-limiter/figure-1-app.png")],
  },
};

export default function CopLimiterProjectPage() {
  const { style, body } = getCopLimiterProjectPage();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(copLimiterJsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
