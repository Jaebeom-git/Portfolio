import type { Metadata } from "next";
import Link from "next/link";
import { ProjectArchive } from "@/src/components/project-archive";
import { courseworkProjects, pageSummaries } from "@/src/lib/portfolioData";
import { absoluteUrl, site, withBasePath } from "@/src/lib/site";

export const metadata: Metadata = {
  title: pageSummaries.coursework.title,
  description: pageSummaries.coursework.description,
  alternates: { canonical: absoluteUrl("/coursework/") },
  openGraph: {
    title: `${pageSummaries.coursework.title} | Jaebeom Jo`,
    description: pageSummaries.coursework.description,
    url: absoluteUrl("/coursework/"),
  },
};

export default function CourseworkPage() {
  const archiveProjects = courseworkProjects.map((project) => ({
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
          <Link href="/projects/">Research and Projects</Link>
          <Link href="/history/">History</Link>
        </div>
      </nav>

      <section className="section-shell page-header">
        <p className="eyebrow">Coursework and Activities</p>
        <h1>{pageSummaries.coursework.title}</h1>
        <p>{pageSummaries.coursework.description}</p>
      </section>

      <ProjectArchive mode="coursework" projects={archiveProjects} />
    </main>
  );
}
