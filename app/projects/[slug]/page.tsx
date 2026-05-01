import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/src/components/project-detail-page";
import { copLimiterJsonLd } from "@/src/lib/copLimiterProjectPage";
import { projectPages } from "@/src/lib/portfolioData";
import { PaperCopLimiterLayout } from "@/src/project-layouts/paper-cop-limiter";
import { PosterRlScalingLayout } from "@/src/project-layouts/poster-rl-scaling";
import { ConferenceOralPaperLayout } from "@/src/project-layouts/conference-oral-paper";
import { ResearchProjectLayout } from "@/src/project-layouts/research-project";
import { absoluteUrl } from "@/src/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectPages.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectPages.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: { absolute: project.title },
    description: project.subtitle,
    keywords: project.keywords,
    authors: [{ name: "Jaebeom Jo" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    alternates: { canonical: absoluteUrl(project.routePath) },
    openGraph: {
      type: "website",
      title: project.title,
      description: project.subtitle,
      url: absoluteUrl(project.routePath),
      images: project.heroImage ? [{ url: absoluteUrl(project.heroImage) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.subtitle,
      images: project.heroImage ? [absoluteUrl(project.heroImage)] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectPages.find((item) => item.slug === slug);
  if (!project) notFound();

  if (project.layout === "paper-cop-limiter") {
    return <PaperCopLimiterLayout project={project} jsonLd={copLimiterJsonLd} />;
  }
  if (project.layout === "poster-rl-scaling") {
    return <PosterRlScalingLayout project={project} />;
  }
  if (project.layout === "conference-oral-paper") {
    return <ConferenceOralPaperLayout project={project} />;
  }
  if (project.layout === "research-project") {
    return <ResearchProjectLayout project={project} />;
  }
  return <ProjectDetailPage project={project} backHref="/projects/" backLabel="Back to Research and Projects" />;
}
