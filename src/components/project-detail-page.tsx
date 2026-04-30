import Link from "next/link";
import { inlineMarkdown, markdownList } from "@/src/lib/markdownContent";
import { site, withBasePath } from "@/src/lib/site";

type ProjectDetail = {
  title: string;
  titleSuffix: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  period: string;
  status: string;
  venue: string;
  source: string;
  keywords: string[];
  heroImage: string;
  body: string;
  sections: Array<{ title: string; body: string }>;
};

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ProjectSection({ title, body }: { title: string; body: string }) {
  const listItems = markdownList(body);
  const paragraphs = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !/^(-|\d+\.)\s+/.test(block));

  return (
    <section className="project-detail-section" id={sectionId(title)}>
      <h2>{title}</h2>
      {listItems.length ? (
        <ul>
          {listItems.map((item) => (
            <li key={item} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ul>
      ) : null}
      {paragraphs.map((paragraph) => (
        <p key={paragraph} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph) }} />
      ))}
    </section>
  );
}

export function ProjectDetailPage({ project, backHref, backLabel }: { project: ProjectDetail; backHref: string; backLabel: string }) {
  const intro = project.body.split(/\n{2,}/).find((block) => block.trim() && !block.trim().startsWith("##"))?.trim();
  const sectionLinks = project.sections.slice(0, 4);

  return (
    <main className="notion-page">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">JB</span>
          <span>{site.owner}</span>
        </Link>
        <div className="nav-links">
          {sectionLinks.map((section) => (
            <a href={`#${sectionId(section.title)}`} key={section.title}>{section.title}</a>
          ))}
        </div>
      </nav>

      <section className="section-shell page-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        {project.titleSuffix ? <p className="project-title-suffix">{project.titleSuffix}</p> : null}
        <p>{project.subtitle}</p>
        <div className="project-meta-grid">
          {[project.period, project.status, project.venue, project.source].filter(Boolean).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {project.keywords.length ? (
          <div className="tag-list">
            {project.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        ) : null}
      </section>

      {project.heroImage ? (
        <section className="section-shell section-card">
          <img className="paper-hero-image" src={withBasePath(project.heroImage)} alt={`${project.shortTitle} preview`} />
        </section>
      ) : null}

      <section className="section-shell section-card project-detail-card">
        {intro ? <p className="project-intro" dangerouslySetInnerHTML={{ __html: inlineMarkdown(intro) }} /> : null}
        {project.sections.map((section) => (
          <ProjectSection title={section.title} body={section.body} key={section.title} />
        ))}
        <div className="project-detail-actions">
          <Link className="project-back-link" href={backHref}>{backLabel}</Link>
        </div>
      </section>
    </main>
  );
}
