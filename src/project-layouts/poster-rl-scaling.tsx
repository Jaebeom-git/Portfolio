import Link from "next/link";
import { inlineMarkdown } from "@/src/lib/markdownContent";
import { withBasePath } from "@/src/lib/site";

type ProjectSection = { title: string; body: string };

type PosterProject = {
  title: string;
  subtitle: string;
  koreanTitle: string;
  shortTitle: string;
  category: string;
  venue: string;
  period: string;
  status: string;
  heroEyebrow: string;
  abstractHeading: string;
  posterHeading: string;
  citationIntro: string;
  paperUrl: string;
  codeUrl: string;
  routePath: string;
  authors: string[];
  body: string;
  sections: ProjectSection[];
};

type Citation = {
  title: string;
  code: string;
};

function findSection(project: PosterProject, title: string) {
  return project.sections.find((section) => section.title.toLowerCase() === title.toLowerCase());
}

function sectionParagraphs(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[\s\S]*?\]\([\s\S]*?\)/g, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith("###") && !/^(-|\d+\.)\s+/.test(block));
}

function posterFigure(section: ProjectSection | undefined) {
  const match = section?.body.match(/!\[(.*?)\]\((.*?)\)/);
  return {
    alt: match?.[1] ?? "Project poster",
    image: match?.[2] ?? "",
  };
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

export function PosterRlScalingLayout({ project }: { project: PosterProject }) {
  const abstractParagraphs = sectionParagraphs(findSection(project, "Abstract")?.body ?? "");
  const posterSection = findSection(project, "Poster");
  const poster = posterFigure(posterSection);
  const citationSection = findSection(project, "Citation");
  const citationIntro = project.citationIntro || sectionParagraphs(citationSection?.body ?? "")[0] || "Cite the conference poster as appropriate.";
  const citationItems = citations(citationSection);

  return (
    <div className="paper-cop-limiter poster-project-page">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <strong><span className="brand-title">{project.shortTitle}</span><span className="brand-kind"> · Project Page</span></strong>
            <span>{project.title}</span>
          </div>
          <nav className="section-nav" aria-label="Section navigation">
            <a href="#abstract">Abstract</a>
            <a href="#poster">Poster</a>
            <a href="#citation">Citation</a>
          </nav>
        </div>
      </div>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="eyebrow">{project.heroEyebrow || "Conference Poster + Research Project"}</div>
            <h1>{project.title}</h1>
            {project.koreanTitle ? <p className="hero-korean-title">{project.koreanTitle}</p> : null}
            {project.authors.length ? <div className="hero-authors">{project.authors.join(", ").replace(/, ([^,]*)$/, ", and $1")}</div> : null}
            <div className="hero-venue">{[project.category, project.period, project.status].filter(Boolean).join(" · ")}</div>
            {project.venue ? <div className="hero-venue-detail">{project.venue}</div> : null}
            <div className="hero-links" aria-label="Project links">
              {project.paperUrl ? (
                <a href={project.paperUrl} target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Paper-Scholar-1d4ed8?style=flat-square" alt="Paper Scholar badge" /></a>
              ) : (
                <span className="badge-disabled"><img src="https://img.shields.io/badge/Paper-Preparing-9ca3af?style=flat-square" alt="Paper preparing badge" /></span>
              )}
              {project.codeUrl ? <a href={project.codeUrl} target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Code-GitHub-1f2937?style=flat-square" alt="Code GitHub badge" /></a> : null}
              <Link href={project.routePath}><img src="https://img.shields.io/badge/Project-Page-0f766e?style=flat-square" alt="Project page badge" /></Link>
            </div>
            <p className="hero-meta">{project.body.split(/\n{2,}/)[0]}</p>
          </div>
        </section>

        <section id="abstract">
          <div className="wrap">
            <SectionHead label="Abstract" heading={project.abstractHeading || "Abstract"} />
            <div className="abstract-card">
              {abstractParagraphs.map((paragraph) => <p key={paragraph} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph) }} />)}
            </div>
          </div>
        </section>

        <section id="poster">
          <div className="wrap">
            <SectionHead label="Poster" heading={project.posterHeading || "Conference poster"} summary="The conference poster summarizes the project motivation, method, experimental setup, and main results." />
            {poster.image ? (
              <article className="figure-card poster-figure-card wide">
                <img src={withBasePath(poster.image)} alt={poster.alt} />
              </article>
            ) : null}
          </div>
        </section>

        <section id="citation">
          <div className="wrap">
            <SectionHead label="Citation" heading="Citation" summary={citationIntro} />
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
