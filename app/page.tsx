import Link from "next/link";
import {
  cvHighlights,
  featuredProjects,
  historyItems,
  pageSummaries,
  portfolioSections,
  profile,
} from "@/src/lib/portfolioData";
import { site, withBasePath } from "@/src/lib/site";

const historyPreviewLimit = 2;

export default function Home() {
  const projectPreview = featuredProjects;
  const historyPreview = historyItems.slice(0, historyPreviewLimit);
  const hiddenHistoryCount = Math.max(historyItems.length - historyPreview.length, 0);

  return (
    <main className="notion-page">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label="Go to top">
          <span className="brand-mark">JB</span>
          <span>{site.owner}</span>
        </Link>
        <div className="nav-links">
          {portfolioSections.map((section) => (
            <a href={section.anchor} key={section.anchor}>{section.label}</a>
          ))}
        </div>
      </nav>

      <section id="top" className="notion-hero section-shell" aria-labelledby="portfolio-title">
        <div className="profile-card">
          <div className="profile-photo-wrap">
            <img className="profile-photo" src={withBasePath(profile.photo)} alt="Portrait of Jaebeom Jo" />
          </div>
          <div className="profile-copy">
            <p className="eyebrow">Jaebeom&apos;s Portfolio</p>
            <h1 id="portfolio-title">{profile.koreanName}</h1>
            <p className="name-line">{profile.englishName}</p>
            <div className="contact-list" aria-label="Public contact links">
              <a href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
              <a href={profile.linkedin}>
                <img className="contact-logo" src={withBasePath("/logos/linkedin-logo.svg")} alt="" />
                LinkedIn · jaebeom-jo
              </a>
              <a href={profile.scholar}>🎓 Google Scholar</a>
            </div>
          </div>
        </div>

        <aside className="notion-index" aria-label="Portfolio sections">
          {portfolioSections.map((section) => (
            <a className="index-card" href={section.anchor} key={section.anchor}>
              <span className="notion-icon">{section.icon}</span>
              <span>
                <strong>{section.label}</strong>
                <small>{section.summary}</small>
              </span>
            </a>
          ))}
        </aside>
      </section>

      <section id="cv" className="section-shell section-card cv-grid portfolio-section-card">
        <div>
          <p className="eyebrow">Curriculum Vitae</p>
          <h2>{pageSummaries.cv.title}</h2>
          <p>{pageSummaries.cv.description}</p>
          <Link className="button secondary" href="/cv/">
            Open C.V.
          </Link>
        </div>
        <div className="mini-card-grid cv-preview-grid">
          {cvHighlights.map((item) => (
            <article className="mini-card preview-only-card" key={item.title}>
              <span className="notion-icon">{item.icon}</span>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-shell section-card cv-grid portfolio-section-card">
        <div>
          <p className="eyebrow">Projects</p>
          <h2>{pageSummaries.projects.title}</h2>
          <p>{pageSummaries.projects.description}</p>
          <Link className="button secondary" href="/projects/">
            Open Project
          </Link>
        </div>

        <div className="project-gallery project-preview-gallery">
          {projectPreview.map((project) => (
            <Link className="project-gallery-card" href={project.routePath} key={project.slug}>
              {project.heroImage ? (
                <img src={withBasePath(project.heroImage)} alt={`${project.shortTitle} project preview`} />
              ) : null}
              <div>
                <p className="paper-meta">{[project.venue, project.year].filter(Boolean).join(" · ")}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="history" className="section-shell section-card cv-grid portfolio-section-card">
        <div>
          <p className="eyebrow">History</p>
          <h2>{pageSummaries.history.title}</h2>
          <p>{pageSummaries.history.description}</p>
          <Link className="button secondary" href="/history/">
            Open History
          </Link>
        </div>
        <div className="timeline compact-timeline">
          {historyPreview.map((item) => (
            <article className={`timeline-item${item.isPresent ? " is-present" : ""}`} key={item.title}>
              {item.iconImage ? (
                <span className="notion-icon image-icon">
                  <img src={withBasePath(item.iconImage)} alt={`${item.title} icon`} />
                </span>
              ) : (
                <span className="notion-icon">{item.icon}</span>
              )}
              <div>
                <h3>{item.title}</h3>
                <p>{item.period ? `${item.period} · ${item.detail}` : item.detail}</p>
              </div>
            </article>
          ))}
          {hiddenHistoryCount ? (
            <article className="timeline-item more-item" aria-label={`${hiddenHistoryCount} more history items`}>
              <span className="notion-icon">…</span>
              <div>
                <h3>More</h3>
                <p>{hiddenHistoryCount} more item{hiddenHistoryCount > 1 ? "s" : ""} in History.</p>
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </main>
  );
}
