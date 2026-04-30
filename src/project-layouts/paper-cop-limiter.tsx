import Link from "next/link";
import { inlineMarkdown } from "@/src/lib/markdownContent";
import { withBasePath } from "@/src/lib/site";

type ProjectSection = { title: string; body: string };

type PaperCopLimiterProject = {
  title: string;
  subtitle: string;
  shortTitle: string;
  venue: string;
  publishedLabel: string;
  published: string;
  doi: string;
  codeUrl: string;
  routePath: string;
  authors: string[];
  body: string;
  sections: ProjectSection[];
};

type Figure = {
  title: string;
  image: string;
  alt: string;
  caption: string;
};

function findSection(project: PaperCopLimiterProject, title: string) {
  return project.sections.find((section) => section.title.toLowerCase() === title.toLowerCase());
}

function paragraphs(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith("###") && !block.startsWith("!["));
}

function sectionIntro(section: ProjectSection | undefined) {
  if (!section) return { heading: "", summary: "", paragraphs: [] as string[] };
  const blocks = paragraphs(section.body);

  if (section.title.toLowerCase() === "citation") {
    return {
      heading: "Citation",
      summary: blocks[0] ?? "",
      paragraphs: blocks.slice(1),
    };
  }

  return {
    heading: blocks[0] ?? section.title,
    summary: blocks[1] ?? "",
    paragraphs: blocks.slice(2),
  };
}

function figures(section: ProjectSection | undefined): Figure[] {
  if (!section) return [];
  return section.body
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [titleLine = "", ...rest] = chunk.split("\n");
      const body = rest.join("\n").trim();
      const image = body.match(/!\[(.*?)\]\((.*?)\)/);
      const caption = body.replace(/!\[[\s\S]*?\]\([\s\S]*?\)/, "").trim();
      return {
        title: titleLine.trim(),
        alt: image?.[1] ?? titleLine.trim(),
        image: image?.[2] ?? "",
        caption,
      };
    })
    .filter((figure) => figure.title && figure.image);
}

function citationCode(section: ProjectSection | undefined) {
  return section?.body.match(/```(?:\w+)?\n([\s\S]*?)```/)?.[1].trim() ?? "";
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

function FigureGrid({ items, wideFirst = false }: { items: Figure[]; wideFirst?: boolean }) {
  return (
    <div className="figure-grid">
      {items.map((figure, index) => (
        <article className={`figure-card${(wideFirst && index === 0) || figure.image.endsWith(".gif") ? " wide" : ""}`} key={figure.title}>
          <img src={withBasePath(figure.image)} alt={figure.alt} />
          <div className="figure-body">
            <h3>{figure.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: inlineMarkdown(figure.caption) }} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function PaperCopLimiterLayout({ project, jsonLd }: { project: PaperCopLimiterProject; jsonLd: object }) {
  const abstract = sectionIntro(findSection(project, "Abstract"));
  const paper = sectionIntro(findSection(project, "Paper"));
  const implementation = sectionIntro(findSection(project, "Implementation"));
  const citation = sectionIntro(findSection(project, "Citation"));
  const citationBibtex = citationCode(findSection(project, "Citation"));
  const paperFigures = figures(findSection(project, "Paper"));
  const implementationFigures = figures(findSection(project, "Implementation"));
  const doiUrl = project.doi ? `https://doi.org/${project.doi}` : "";

  return (
    <div className="paper-cop-limiter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <strong>{project.shortTitle} · Project Page</strong>
            <span>{project.title}</span>
          </div>
          <nav className="section-nav" aria-label="Section navigation">
            <a href="#abstract">Abstract</a>
            <a href="#paper">Paper</a>
            <a href="#implementation">Implementation</a>
            <a href="#citation">Citation</a>
          </nav>
        </div>
      </div>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="eyebrow">Paper + Official Implementation</div>
            <h1>{project.title}</h1>
            {project.authors.length ? <div className="hero-authors">{project.authors.join(", ").replace(/, ([^,]*)$/, ", and $1")}</div> : null}
            <div className="hero-venue">{[project.venue, project.publishedLabel || project.published].filter(Boolean).join(" · ")}</div>
            <div className="hero-links" aria-label="Project links">
              {doiUrl ? <a href={doiUrl} target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Paper-DOI-1d4ed8?style=flat-square" alt="Paper DOI badge" /></a> : null}
              {project.codeUrl ? <a href={project.codeUrl} target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Code-GitHub-1f2937?style=flat-square" alt="Code GitHub badge" /></a> : null}
              <Link href={project.routePath}><img src="https://img.shields.io/badge/Project-Page-0f766e?style=flat-square" alt="Project page badge" /></Link>
            </div>
            <p className="hero-meta">{project.body.split(/\n{2,}/)[0]}</p>
          </div>
        </section>

        <section id="abstract">
          <div className="wrap">
            <SectionHead label="Abstract" heading={abstract.heading} summary={abstract.summary} />
            <div className="abstract-card">
              {abstract.paragraphs.map((paragraph) => <p key={paragraph} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph) }} />)}
            </div>
          </div>
        </section>

        <section id="paper">
          <div className="wrap">
            <SectionHead label="Paper" heading={paper.heading} summary={paper.summary}>
              <div className="section-actions">
                {doiUrl ? <a className="primary" href={doiUrl} target="_blank" rel="noreferrer">Read Paper</a> : null}
                <a href="#citation">Citation</a>
              </div>
            </SectionHead>
            <FigureGrid items={paperFigures} wideFirst />
          </div>
        </section>

        <section id="implementation">
          <div className="wrap">
            <SectionHead label="Implementation" heading={implementation.heading} summary={implementation.summary}>
              <div className="section-actions">
                {project.codeUrl ? <a className="primary" href={project.codeUrl} target="_blank" rel="noreferrer">View GitHub</a> : null}
                <a href="#citation">Citation</a>
              </div>
            </SectionHead>
            <FigureGrid items={implementationFigures} />
          </div>
        </section>

        <section id="citation">
          <div className="wrap">
            <SectionHead label="Citation" heading={citation.heading || "Citation"} summary={citation.summary} />
            {citationBibtex ? <div className="citation-card"><pre>{citationBibtex}</pre></div> : null}
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
