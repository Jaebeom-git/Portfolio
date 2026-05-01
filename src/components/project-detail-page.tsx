import Link from "next/link";
import { inlineMarkdown, markdownList } from "@/src/lib/markdownContent";
import { site, withBasePath } from "@/src/lib/site";

type ProjectDetail = {
  title: string;
  koreanTitle: string;
  titleSuffix: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  period: string;
  status: string;
  venue: string;
  source: string;
  codeUrl: string;
  paperUrl: string;
  pageUrl: string;
  showLinks: boolean;
  keywords: string[];
  heroImage: string;
  body: string;
  sections: Array<{ title: string; body: string }>;
};

function youtubeEmbedUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") videoId = url.searchParams.get("v") ?? "";
      if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/").filter(Boolean)[1] ?? "";
      }
    }

    if (!videoId) return "";

    const startParam = url.searchParams.get("t") ?? url.searchParams.get("start") ?? "";
    const start = youtubeStartSeconds(startParam);
    const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
    if (start) embed.searchParams.set("start", String(start));
    return embed.toString();
  } catch {
    return "";
  }
}

function youtubeStartSeconds(value: string) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;

  const [, hours = "0", minutes = "0", seconds = "0"] = match;
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}



function markdownCodeBlock(markdown: string) {
  const match = markdown.match(/^```(\w+)?\n([\s\S]*?)\n```$/);
  if (!match) return null;
  return { language: match[1] ?? "text", code: match[2] };
}

function markdownImage(markdown: string) {
  const match = markdown.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (!match) return null;
  return { alt: match[1], src: match[2] };
}

function firstUrlFromText(text: string) {
  return text.match(/https?:\/\/[^\s)]+/)?.[0] ?? "";
}

function renderTextBlock(block: string, key: string) {
  const subheading = block.match(/^###\s+(.+)$/);
  if (subheading) {
    return <h3 className="project-detail-subheading" key={`subheading-${subheading[1]}`}>{subheading[1]}</h3>;
  }

  const codeBlock = markdownCodeBlock(block);
  if (codeBlock) {
    return <ProjectCodeBlock code={codeBlock.code} key={key} language={codeBlock.language} />;
  }

  const image = markdownImage(block);
  if (image) {
    return <ProjectMarkdownImage alt={image.alt} key={key} src={image.src} />;
  }

  const url = firstUrlFromText(block);
  const embedUrl = url ? youtubeEmbedUrl(url) : "";

  if (embedUrl) {
    return <YouTubeEmbed embedUrl={embedUrl} title={block.replace(url, "").replace(/^[-:·\s]+|[-:·\s]+$/g, "") || "Project video"} key={key} />;
  }

  return <p key={key} dangerouslySetInnerHTML={{ __html: inlineMarkdown(block) }} />;
}



function ProjectCodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <pre className="project-code-block">
      <code data-language={language}>{code}</code>
    </pre>
  );
}

function ProjectMarkdownImage({ alt, src }: { alt: string; src: string }) {
  return (
    <figure className="project-markdown-figure">
      <img src={withBasePath(src)} alt={alt} />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}

function YouTubeEmbed({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <div className="video-embed-card">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={embedUrl}
        title={title}
      />
    </div>
  );
}

function renderListItem(item: string) {
  const url = firstUrlFromText(item);
  const embedUrl = url ? youtubeEmbedUrl(url) : "";
  const label = item.replace(url, "").replace(/^[-:·\s]+|[-:·\s]+$/g, "");

  if (embedUrl) {
    return (
      <>
        {label ? <p dangerouslySetInnerHTML={{ __html: inlineMarkdown(label) }} /> : null}
        <YouTubeEmbed embedUrl={embedUrl} title={label || "Project video"} />
      </>
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />;
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


function ProjectHeaderLinks({ project }: { project: ProjectDetail }) {
  const shouldShow = project.showLinks || project.paperUrl || project.codeUrl || project.pageUrl;
  if (!shouldShow) return null;

  const links = [
    { label: "Paper", href: project.paperUrl, disabledLabel: "Preparing" },
    { label: "Code", href: project.codeUrl, disabledLabel: "Private" },
    { label: "Page", href: project.pageUrl, disabledLabel: "Preparing" },
  ];

  return (
    <div className="project-hero-links" aria-label="Project links">
      {links.map((link) => {
        if (link.href) {
          const href = link.href.startsWith("/") ? withBasePath(link.href) : link.href;
          return (
            <a href={href} key={link.label} target="_blank" rel="noreferrer">
              <span>{link.label}</span>
            </a>
          );
        }

        if (!project.showLinks) return null;

        return (
          <span className="is-disabled" key={link.label} aria-disabled="true">
            <span>{link.label}</span>
            <small>{link.disabledLabel}</small>
          </span>
        );
      })}
    </div>
  );
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
            <li key={item}>{renderListItem(item)}</li>
          ))}
        </ul>
      ) : null}
      {paragraphs.map((paragraph) => renderTextBlock(paragraph, paragraph))}
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

      <section className="section-shell page-header project-page-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        {project.koreanTitle ? <p className="project-korean-title">{project.koreanTitle}</p> : null}
        {project.titleSuffix ? <p className="project-title-suffix">{project.titleSuffix}</p> : null}
        <p>{project.subtitle}</p>
        <div className="project-meta-grid">
          {[project.period, project.status, project.venue, project.source].filter(Boolean).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <ProjectHeaderLinks project={project} />
        {project.keywords.length ? (
          <div className="tag-list">
            {project.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        ) : null}
      </section>

      <section className="section-shell section-card project-detail-card">
        {intro ? <div className="project-intro">{renderTextBlock(intro, "project-intro")}</div> : null}
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
