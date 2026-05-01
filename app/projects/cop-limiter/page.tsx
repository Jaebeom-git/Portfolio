import type { Metadata } from "next";
import { copLimiterProject, copLimiterJsonLd } from "@/src/lib/copLimiterProjectPage";
import { projectPages } from "@/src/lib/portfolioData";
import { PaperCopLimiterLayout } from "@/src/project-layouts/paper-cop-limiter";
import { absoluteUrl } from "@/src/lib/site";

const title = "MAISE: Joint Torque Estimation for Passive Sarcopenia Monitoring | Paper + Code";
const description =
  "Project page for the paper ‘Joint torque estimation from daily living motion for passive sarcopenia monitoring in older adults,’ featuring MAISE and the CoP-constrained GRF-estimation code used for downstream torque analysis.";
const keywords = [...copLimiterProject.keywords];

export const metadata: Metadata = {
  title,
  description,
  keywords,
  authors: copLimiterProject.authors.map((name) => ({ name })),
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
    images: [{ url: absoluteUrl("/projects/cop-limiter/figure-1-app.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Project page for MAISE and the CoP-constrained GRF-estimation code used to support motion-based joint torque analysis.",
    images: [absoluteUrl("/projects/cop-limiter/figure-1-app.png")],
  },
};

export default function CopLimiterProjectPage() {
  const project = projectPages.find((item) => item.slug === copLimiterProject.slug);
  if (!project) {
    throw new Error("CoP-Limiter project content is missing");
  }
  return <PaperCopLimiterLayout project={project} jsonLd={copLimiterJsonLd} />;
}
