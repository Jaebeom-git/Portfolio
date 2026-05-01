import Link from "next/link";
import { inlineMarkdown, markdownList } from "@/src/lib/markdownContent";
import { withBasePath } from "@/src/lib/site";

type ProjectSection = { title: string; body: string };

type ResearchProject = {
  title: string;
  titleSuffix: string;
  topbarTitle: string;
  subtitle: string;
  koreanTitle: string;
  shortTitle: string;
  category: string;
  venue: string;
  period: string;
  status: string;
  routePath: string;
  body: string;
  sections: ProjectSection[];
};

type PublicationDetail = {
  title: string;
  body: string;
};

type PublicationLink = {
  label: string;
  href: string;
};

type PublicationRecord = {
  meta: string;
  intro: string;
  details: PublicationDetail[];
  links: PublicationLink[];
};

function findSection(project: ResearchProject, title: string) {
  return project.sections.find((section) => section.title.toLowerCase() === title.toLowerCase());
}

function paragraphs(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[\s\S]*?\]\([\s\S]*?\)/g, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith("###") && !block.startsWith("####") && !/^(-|\d+\.)\s+/.test(block));
}

function codeBlocks(markdown: string) {
  return Array.from(markdown.matchAll(/```(?:\w+)?\n([\s\S]*?)```/g)).map((match) => match[1].trim());
}

function images(markdown: string) {
  return Array.from(markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)).map((match) => ({
    alt: match[1] || "Project image",
    src: match[2],
  }));
}

function publicationLinks(markdown: string): PublicationLink[] {
  return markdownList(markdown)
    .map((item) => {
      const match = item.match(/^([^:]+):\s*((?:https?:\/\/|\/)\S+)$/);
      return match ? { label: match[1].trim(), href: match[2].trim() } : undefined;
    })
    .filter((link): link is PublicationLink => Boolean(link));
}

function parsePublications(section: ProjectSection | undefined): PublicationRecord[] {
  if (!section) return [];
  return section.body
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [meta = "", ...rest] = chunk.split("\n");
      const body = rest.join("\n").trim();
      const [intro = "", ...detailChunks] = body.split(/^####\s+/m);
      const parsedDetails = detailChunks.map((detail) => {
        const [titleLine = "", ...detailRest] = detail.split("\n");
        return { title: titleLine.trim(), body: detailRest.join("\n").trim() };
      }).filter((detail) => detail.title);
      const links = parsedDetails.filter((detail) => /links?/i.test(detail.title)).flatMap((detail) => publicationLinks(detail.body));
      const details = parsedDetails.filter((detail) => !/links?/i.test(detail.title));
      return { meta: meta.trim(), intro: intro.trim(), details, links };
    })
    .filter((publication) => publication.meta);
}

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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

function TextBlocks({ body, includeImages = true }: { body: string; includeImages?: boolean }) {
  const listItems = markdownList(body);
  const textBlocks = paragraphs(body);
  const bodyImages = images(body);
  return (
    <>
      {textBlocks.map((paragraph) => <p key={paragraph} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph) }} />)}
      {listItems.length ? (
        <ul>
          {listItems.map((item) => <li key={item} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />)}
        </ul>
      ) : null}
      {includeImages && bodyImages.length ? <ImageGallery items={bodyImages} idBase={`info-${sectionId(bodyImages[0].alt)}`} /> : null}
    </>
  );
}

function InfoSection({ section, label }: { section: ProjectSection | undefined; label: string }) {
  if (!section) return null;
  const sectionImages = images(section.body);

  return (
    <section id={sectionId(section.title)}>
      <div className="wrap">
        <SectionHead label={label} heading={section.title} />
        <div className="abstract-card research-info-card">
          <TextBlocks body={section.body} includeImages={false} />
        </div>
        {sectionImages.length ? (
          <div className="research-info-media-card">
            <ImageGallery items={sectionImages} idBase={`info-${sectionId(section.title)}`} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function urlsFromText(text: string) {
  return Array.from(text.matchAll(/https?:\/\/[^\s)]+/g)).map((match) => match[0]);
}

function youtubeStartSeconds(value: string) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;

  const [, hours = "0", minutes = "0", seconds = "0"] = match;
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

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

function linkedinEmbedUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");
    if (host !== "linkedin.com") return "";

    const activityId = rawUrl.match(/activity-(\d+)/)?.[1] ?? "";
    if (!activityId) return "";

    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`;
  } catch {
    return "";
  }
}

function VideoSection({ section }: { section: ProjectSection | undefined }) {
  if (!section) return null;

  const urls = urlsFromText(section.body);
  const textBody = urls.reduce((body, url) => body.replace(url, ""), section.body).trim();
  const embeds = urls.map((url) => ({
    url,
    youtube: youtubeEmbedUrl(url),
    linkedin: linkedinEmbedUrl(url),
  }));

  return (
    <section id={sectionId(section.title)}>
      <div className="wrap">
        <SectionHead label="Video" heading={section.title} />
        <div className="abstract-card research-info-card research-video-card">
          {textBody ? <TextBlocks body={textBody} /> : null}
          {embeds.map((embed) => {
            if (embed.youtube) {
              return (
                <div className="video-embed-card" key={embed.url}>
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={embed.youtube}
                    title={`${section.title} video`}
                  />
                </div>
              );
            }

            if (embed.linkedin) {
              return (
                <div className="linkedin-embed-card" key={embed.url}>
                  <iframe
                    allowFullScreen
                    loading="lazy"
                    src={embed.linkedin}
                    title={`${section.title} LinkedIn post`}
                  />
                </div>
              );
            }

            return <p key={embed.url}><a href={embed.url} target="_blank" rel="noreferrer">{embed.url}</a></p>;
          })}
        </div>
      </div>
    </section>
  );
}

function ImageGallery({ items, idBase }: { items: Array<{ alt: string; src: string }>; idBase: string }) {
  if (items.length === 1) {
    const image = items[0];
    return (
      <figure className="publication-single-image">
        <img src={withBasePath(image.src)} alt={image.alt} />
        <figcaption>{image.alt}</figcaption>
      </figure>
    );
  }

  return (
    <div className="publication-image-carousel">
      {items.map((image, index) => (
        <input
          className="publication-image-input"
          defaultChecked={index === 0}
          id={`${idBase}-image-${index}`}
          key={`${image.src}-input`}
          name={`${idBase}-image`}
          type="radio"
        />
      ))}
      <div className="publication-image-panels">
        {items.map((image, index) => (
          <figure key={image.src}>
            <img src={withBasePath(image.src)} alt={image.alt} />
            <figcaption>{image.alt || `Page ${index + 1}`}</figcaption>
          </figure>
        ))}
      </div>
      <div className="publication-image-nav" aria-label="Image pages">
        {items.map((image, index) => (
          <label htmlFor={`${idBase}-image-${index}`} key={`${image.src}-label`}>{index + 1}</label>
        ))}
      </div>
    </div>
  );
}

function PublicationDetailBlock({ detail, idBase }: { detail: PublicationDetail; idBase: string }) {
  const detailImages = images(detail.body);
  const citations = codeBlocks(detail.body);
  const urls = urlsFromText(detail.body);
  const text = paragraphs(detail.body).filter((paragraph) => !urls.includes(paragraph.trim()));
  const isCitation = /citation/i.test(detail.title);
  const embeds = urls.map((url) => ({
    url,
    youtube: youtubeEmbedUrl(url),
    linkedin: linkedinEmbedUrl(url),
  }));

  return (
    <div className={`publication-detail${isCitation ? " is-citation" : ""}`} id={idBase}>
      <h4>{detail.title}</h4>
      {text.map((paragraph) => <p key={paragraph} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph) }} />)}
      {detailImages.length ? <ImageGallery items={detailImages} idBase={idBase} /> : null}
      {embeds.map((embed) => {
        if (embed.youtube) {
          return (
            <div className="video-embed-card" key={embed.url}>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src={embed.youtube}
                title={`${detail.title} video`}
              />
            </div>
          );
        }

        if (embed.linkedin) {
          return (
            <div className="linkedin-embed-card" key={embed.url}>
              <iframe
                allowFullScreen
                loading="lazy"
                src={embed.linkedin}
                title={`${detail.title} LinkedIn post`}
              />
            </div>
          );
        }

        return null;
      })}
      {citations.map((citation) => <pre key={citation}>{citation}</pre>)}
    </div>
  );
}

function publicationBadge(link: PublicationLink) {
  const normalized = link.label.toLowerCase();
  if (normalized.includes("youtube") || normalized.includes("video")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/Video-YouTube-ff0000?style=flat-square" };
  }
  if (normalized.includes("linkedin")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/LinkedIn-Post-0a66c2?style=flat-square" };
  }
  if (normalized.includes("blog") || normalized.includes("functionbay")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/Blog-FunctionBay-0f766e?style=flat-square" };
  }
  if (normalized.includes("scholar")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/Scholar-Google-4285f4?style=flat-square" };
  }
  if (normalized.includes("poster")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/Poster-PDF-7c3aed?style=flat-square" };
  }
  if (normalized.includes("pdf")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/Paper-PDF-111827?style=flat-square" };
  }
  if (normalized.includes("doi")) {
    return { alt: `${link.label} badge`, src: "https://img.shields.io/badge/Paper-DOI-1d4ed8?style=flat-square" };
  }
  return { alt: `${link.label} badge`, src: `https://img.shields.io/badge/${encodeURIComponent(link.label)}-Link-0f766e?style=flat-square` };
}

function publicationTabLabel(publication: PublicationRecord) {
  if (/video|youtube/i.test(publication.meta)) return "Video";
  if (/linkedin/i.test(publication.meta)) return "LinkedIn";
  if (/blog|functionbay/i.test(publication.meta)) return "Blog";

  const metaParts = publication.meta.split("·").map((part) => part.trim()).filter(Boolean);
  const year = publication.meta.match(/\b(20\d{2})\b/)?.[1] ?? "";
  const possibleType = metaParts.at(-1) ?? "";
  const type = /^(poster|oral|paper|published|manuscript|presentation)$/i.test(possibleType) ? possibleType : "";
  const venue = publication.intro.match(/\b(ICROS-KROS|ICROS|KRoC|KSME|KAOSTS|KROS)\b/)?.[1]
    ?? metaParts[0]?.replace("Domestic Conference", "Conference")
    ?? "Publication";
  return [venue, year].filter(Boolean).join(" ") + (type ? ` · ${type}` : "");
}

function RelatedPublications({ section, variant = "publications" }: { section: ProjectSection | undefined; variant?: "publications" | "materials" }) {
  const publications = parsePublications(section);
  if (!section || !publications.length) return null;
  const isMaterials = variant === "materials";

  return (
    <section id={isMaterials ? "related-materials" : "related-publications"}>
      <div className="wrap">
        <SectionHead
          label={isMaterials ? "Related Materials" : "Related Publications"}
          heading={isMaterials ? "Related Materials" : "Related Publications"}
          summary={isMaterials ? "Select a material." : "Select a publication."}
        />
        <div className="publication-tabs">
          {publications.map((publication, index) => (
            <input
              className="publication-tab-input"
              defaultChecked={index === 0}
              id={`publication-tab-${index}`}
              key={`${publication.meta}-input`}
              name="publication-tab"
              type="radio"
            />
          ))}
          <div className="publication-toolbar" aria-label="Publication navigation">
            <div className="publication-tab-list" aria-label="Publication selector">
              {publications.map((publication, index) => (
                <label className="publication-tab-button" htmlFor={`publication-tab-${index}`} key={`${publication.meta}-tab`}>
                  <span>{publicationTabLabel(publication)}</span>
                </label>
              ))}
            </div>
            <div className="publication-section-lists">
              {publications.map((publication, publicationIndex) => (
                <nav className="publication-section-list" aria-label={`${publication.meta} section navigation`} key={`${publication.meta}-section-nav`}>
                  {publication.details.map((detail, detailIndex) => (
                    <a href={`#publication-${publicationIndex}-${detailIndex}`} key={`${publication.meta}-${detail.title}-nav`}>
                      {detail.title}
                    </a>
                  ))}
                </nav>
              ))}
            </div>
          </div>
          <div className="publication-panels">
            {publications.map((publication, publicationIndex) => (
              <article className="publication-card publication-panel" key={publication.meta}>
                <div className="publication-meta">
                  <span>{publication.meta}</span>
                </div>
                <div className="publication-intro">
                  <TextBlocks body={publication.intro} />
                  {publication.links.length ? (
                    <div className="section-actions publication-actions" aria-label="Publication links">
                      {publication.links.map((link) => {
                        const badge = publicationBadge(link);
                        const href = link.href.startsWith("/") ? withBasePath(link.href) : link.href;
                        return (
                          <a href={href} key={`${publication.meta}-${link.href}`} target="_blank" rel="noreferrer">
                            <img src={badge.src} alt={badge.alt} />
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                {publication.details.length ? (
                  <div className="publication-detail-stack">
                    {publication.details.map((detail, detailIndex) => (
                      <PublicationDetailBlock
                        detail={detail}
                        idBase={`publication-${publicationIndex}-${detailIndex}`}
                        key={`${publication.meta}-${detail.title}`}
                      />
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResearchProjectLayout({ project }: { project: ResearchProject }) {
  const overview = findSection(project, "Overview");
  const contributions = findSection(project, "Contributions");
  const video = findSection(project, "Video");
  const materials = findSection(project, "Materials") ?? findSection(project, "Award and Materials");
  const relatedPublications = findSection(project, "Related Publications") ?? findSection(project, "Related Publication");
  const relatedMaterials = findSection(project, "Related Materials") ?? findSection(project, "Related Material");
  const projectKind = /competition/i.test(project.category)
    ? /capstone/i.test(project.category)
      ? "Competition + Capstone Design"
      : "Competition"
    : "Research Project";
  const topbarSubtitle = project.topbarTitle || project.titleSuffix || project.koreanTitle || project.title;
  const showTitleSuffix = Boolean(
    project.titleSuffix &&
      project.titleSuffix !== project.title &&
      project.titleSuffix !== project.koreanTitle,
  );

  return (
    <div className="paper-cop-limiter research-project-page">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <strong><span className="brand-title">{project.shortTitle}</span><span className="brand-kind"> · {projectKind}</span></strong>
            <span>{topbarSubtitle}</span>
          </div>
          <nav className="section-nav" aria-label="Section navigation">
            {overview ? <a href="#overview">Overview</a> : null}
            {contributions ? <a href="#contributions">Contributions</a> : null}
            {video ? <a href="#video">Video</a> : null}
            {materials ? <a href={`#${sectionId(materials.title)}`}>Materials</a> : null}
            {relatedMaterials ? <a href="#related-materials">Materials</a> : null}
            {relatedPublications ? <a href="#related-publications">Publications</a> : null}
          </nav>
        </div>
      </div>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="eyebrow">{projectKind}</div>
            <h1>{project.title}</h1>
            {showTitleSuffix ? (
              <p className="hero-title-suffix">{project.titleSuffix}</p>
            ) : project.koreanTitle ? (
              <p className="hero-korean-title">{project.koreanTitle}</p>
            ) : null}
            <div className="hero-venue">{[project.category, project.period, project.status].filter(Boolean).join(" · ")}</div>
            {project.venue ? <div className="hero-venue-detail">{project.venue}</div> : null}
            <div className="hero-links" aria-label="Project links">
              <Link href={project.routePath}><img src="https://img.shields.io/badge/Project-Page-0f766e?style=flat-square" alt="Project page badge" /></Link>
            </div>
            <p className="hero-meta">{project.subtitle}</p>
          </div>
        </section>
        <InfoSection section={overview} label="Overview" />
        <InfoSection section={contributions} label="Contributions" />
        <VideoSection section={video} />
        <InfoSection section={materials} label="Materials" />
        <RelatedPublications section={relatedMaterials} variant="materials" />
        <RelatedPublications section={relatedPublications} />
        <div className="wrap">
          <div className="paper-bottom-actions">
            <Link className="primary" href="/projects/">Back to Research and Projects</Link>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          A research project page for <em>{project.title}</em>.
        </div>
      </footer>
    </div>
  );
}
