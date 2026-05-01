import Link from "next/link";
import { inlineMarkdown } from "@/src/lib/markdownContent";
import { withBasePath } from "@/src/lib/site";

type ProjectSection = { title: string; body: string };

type ConferenceOralProject = {
  title: string;
  subtitle: string;
  koreanTitle: string;
  shortTitle: string;
  category: string;
  venue: string;
  period: string;
  status: string;
  paperUrl: string;
  routePath: string;
  authors: string[];
  body: string;
  sections: ProjectSection[];
};

function findSection(project: ConferenceOralProject, title: string) {
  return project.sections.find((section) => section.title.toLowerCase() === title.toLowerCase());
}

function paragraphs(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith("###") && !block.startsWith("!["));
}

function SectionHead({ label, heading, summary, children }: { label: string; heading: string; summary?: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <span className="section-label">{label}</span>
      <h2 dangerouslySetInnerHTML={{ __html: inlineMarkdown(heading) }} />
      {summary ? <p dangerouslySetInnerHTML={{ __html: inlineMarkdown(summary) }} /> : null}
      {children}
    </div>
  );
}

type PaperImage = { alt: string; src: string };
type Citation = { title: string; code: string };

function paperImages(section: ProjectSection | undefined): PaperImage[] {
  if (!section) return [];
  return Array.from(section.body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)).map((match) => ({
    alt: match[1] || "Paper page",
    src: match[2],
  }));
}

function citations(section: ProjectSection | undefined): Citation[] {
  if (!section) return [];
  return section.body
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [titleLine = "", ...rest] = chunk.split("\n");
      const body = rest.join("\n");
      const code = body.match(/```(?:\w+)?\n([\s\S]*?)```/)?.[1].trim() ?? "";
      return { title: titleLine.trim(), code };
    })
    .filter((citation) => citation.title && citation.code);
}

export function ConferenceOralPaperLayout({ project }: { project: ConferenceOralProject }) {
  const abstractParagraphs = paragraphs(findSection(project, "Abstract")?.body ?? "");
  const paperHref = project.paperUrl ? withBasePath(project.paperUrl) : "";
  const paperPages = paperImages(findSection(project, "Paper"));
  const citationItems = citations(findSection(project, "Citation"));

  return (
    <div className="paper-cop-limiter conference-oral-paper-page">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <strong><span className="brand-title">{project.shortTitle}</span><span className="brand-kind"> · Project Page</span></strong>
            <span>{project.title}</span>
          </div>
          <nav className="section-nav" aria-label="Section navigation">
            <a href="#abstract">Abstract</a>
            <a href="#paper">Paper</a>
            <a href="#citation">Citation</a>
          </nav>
        </div>
      </div>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="eyebrow">Domestic Conference + Oral</div>
            <h1>{project.title}</h1>
            {project.koreanTitle ? <p className="hero-korean-title">{project.koreanTitle}</p> : null}
            {project.authors.length ? <div className="hero-authors">{project.authors.join(", ").replace(/, ([^,]*)$/, ", and $1")}</div> : null}
            <div className="hero-venue">{[project.category, project.period, project.status].filter(Boolean).join(" · ")}</div>
            {project.venue ? <div className="hero-venue-detail">{project.venue}</div> : null}
            <div className="hero-links" aria-label="Project links">
              <a href="#paper"><img src="https://img.shields.io/badge/Paper-PDF%20View-1d4ed8?style=flat-square" alt="Paper PDF view badge" /></a>
              <Link href={project.routePath}><img src="https://img.shields.io/badge/Project-Page-0f766e?style=flat-square" alt="Project page badge" /></Link>
            </div>
            <p className="hero-meta">{project.subtitle}</p>
          </div>
        </section>

        <section id="abstract">
          <div className="wrap">
            <SectionHead label="Abstract" heading="Abstract" summary={project.subtitle} />
            <div className="abstract-card">
              {abstractParagraphs.map((paragraph) => <p key={paragraph} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph) }} />)}
            </div>
          </div>
        </section>

        <section id="paper">
          <div className="wrap">
            <SectionHead label="Paper" heading="KRoC 2025 paper" summary="The paper is rendered as page images below, so the page can be viewed without triggering an automatic PDF download.">
              <div className="section-actions">
                {paperHref ? <a className="primary" href={paperHref} target="_blank" rel="noreferrer">Open PDF in new tab</a> : null}
                <a href="#citation">Citation</a>
              </div>
            </SectionHead>
            {paperPages.length ? (
              <div className="paper-image-stack" aria-label="Rendered paper pages">
                {paperPages.map((page, index) => (
                  <figure className="paper-page-card" key={page.src}>
                    <img src={withBasePath(page.src)} alt={page.alt} />
                    <figcaption>Page {index + 1}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section id="citation">
          <div className="wrap">
            <SectionHead label="Citation" heading="Citation" summary="Use the BibTeX entry below for the KRoC 2025 oral presentation." />
            <div className="citation-stack">
              {citationItems.map((citation) => (
                <div className="citation-card" key={citation.title}>
                  <h3>{citation.title}</h3>
                  <pre>{citation.code}</pre>
                </div>
              ))}
            </div>
            <div className="paper-bottom-actions">
              <Link className="primary" href="/projects/">Back to Research and Projects</Link>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          A project page for <em>{project.title}</em>.
        </div>
      </footer>
    </div>
  );
}
