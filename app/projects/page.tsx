import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects, pageSummaries } from "@/src/lib/portfolioData";
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
          <Link href="/history/">History</Link>
        </div>
      </nav>

      <section className="section-shell page-header">
        <p className="eyebrow">Projects</p>
        <h1>{pageSummaries.projects.title}</h1>
        <p>{pageSummaries.projects.description}</p>
      </section>

      <section className="section-shell project-browser">
        <input className="project-view-input" type="radio" name="project-view" id="project-view-gallery" defaultChecked />
        <input className="project-view-input" type="radio" name="project-view" id="project-view-list" />

        <div className="project-browser-toolbar">
          <p className="paper-meta">{featuredProjects.length} project{featuredProjects.length === 1 ? "" : "s"}</p>
          <div className="view-switch" aria-label="Project view mode">
            <label htmlFor="project-view-gallery">Gallery</label>
            <label htmlFor="project-view-list">List</label>
          </div>
        </div>

        <div className="project-gallery full-gallery project-gallery-view">
          {featuredProjects.map((project) => (
            <Link className="project-gallery-card" href={project.routePath} key={project.slug}>
              {project.heroImage ? (
                <img src={withBasePath(project.heroImage)} alt={`${project.shortTitle} project preview`} />
              ) : null}
              <div>
                <p className="paper-meta">{[project.venue, project.year].filter(Boolean).join(" · ")}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.title}</p>
                {project.keywords.length ? (
                  <div className="tag-list compact-tags">
                    {project.keywords.slice(0, 4).map((keyword) => <span key={keyword}>{keyword}</span>)}
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="project-list-view">
          {featuredProjects.map((project) => (
            <Link className="project-list-card" href={project.routePath} key={project.slug}>
              {project.heroImage ? (
                <img className="project-list-thumb" src={withBasePath(project.heroImage)} alt={`${project.shortTitle} project preview`} />
              ) : null}
              <div>
                <p className="paper-meta">{[project.venue, project.year].filter(Boolean).join(" · ")}</p>
                <h2>{project.shortTitle}</h2>
                <p>{project.title}</p>
              </div>
              <span>Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
