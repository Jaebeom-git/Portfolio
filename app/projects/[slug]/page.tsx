import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copLimiterJsonLd, getCopLimiterProjectPage } from "@/src/lib/copLimiterProjectPage";
import { featuredProjects } from "@/src/lib/portfolioData";
import { absoluteUrl, site, withBasePath } from "@/src/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: { absolute: project.title },
    description: project.subtitle,
    keywords: project.keywords,
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

function GenericProject({ slug }: { slug: string }) {
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="notion-page">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">JB</span>
          <span>{site.owner}</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Main</Link>
          <Link href="/projects/">Projects</Link>
        </div>
      </nav>

      <section className="section-shell page-header">
        <p className="eyebrow">Project</p>
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>
      </section>

      {project.heroImage ? (
        <section className="section-shell section-card">
          <img className="paper-hero-image" src={withBasePath(project.heroImage)} alt={`${project.shortTitle} preview`} />
        </section>
      ) : null}
    </main>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  if (slug !== "cop-limiter") {
    return <GenericProject slug={slug} />;
  }

  const { style, body } = getCopLimiterProjectPage();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(copLimiterJsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
