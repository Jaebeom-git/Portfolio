import type { Metadata } from "next";
import Link from "next/link";
import { ProjectArchive } from "@/src/components/project-archive";
import { activityProjects, featuredProjects, pageSummaries } from "@/src/lib/portfolioData";
import { absoluteUrl, site, withBasePath } from "@/src/lib/site";

export const metadata: Metadata = {
  title: pageSummaries.projects.title,
  description: pageSummaries.projects.description,
  alternates: { canonical: absoluteUrl("/projects/") },
  openGraph: {
    title: `${pageSummaries.projects.title} | Jaebeom Jo`,
    description: pageSummaries.projects.description,
    url: absoluteUrl("/projects/"),
  },
};

export default function ProjectsPage() {
  const archiveProjects = featuredProjects.map((project) => ({
    ...project,
    heroImage: project.heroImage ? withBasePath(project.heroImage) : "",
  }));

  return (
    <main className="notion-page">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">JB</span>
          <span>{site.owner}</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Main</Link>
          <Link href="/cv/">Curriculum Vitae</Link>
          {activityProjects.length ? <Link href="/activities/">Coursework and Activities</Link> : null}
          <Link href="/history/">History</Link>
        </div>
      </nav>

      <section className="section-shell page-header">
        <p className="eyebrow">Research and Projects</p>
        <h1>{pageSummaries.projects.title}</h1>
        {pageSummaries.projects.description ? <p>{pageSummaries.projects.description}</p> : null}
      </section>

      <ProjectArchive mode="research" projects={archiveProjects} />
    </main>
  );
}
