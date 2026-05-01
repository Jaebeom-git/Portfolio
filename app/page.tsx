import Link from "next/link";
import {
  cvHighlights,
  activityProjects,
  featuredProjects,
  historyItems,
  pageSummaries,
  portfolioSections,
  profile,
} from "@/src/lib/portfolioData";
import { site, withBasePath } from "@/src/lib/site";

const historyPreviewLimit = 2;
const projectPreviewLimit = 4;
const activityPreviewLimit = 4;

export default function Home() {
  const projectPreview = featuredProjects.slice(0, projectPreviewLimit);
  const hiddenProjectCount = Math.max(featuredProjects.length - projectPreview.length, 0);
  const activityPreview = activityProjects.slice(0, activityPreviewLimit);
  const hiddenActivityCount = Math.max(activityProjects.length - activityPreview.length, 0);
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
            Open
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
          <p className="eyebrow">Research and Projects</p>
          <h2>{pageSummaries.projects.title}</h2>
          {pageSummaries.projects.description ? <p>{pageSummaries.projects.description}</p> : null}
          <Link className="button secondary" href="/projects/">
            Open
          </Link>
        </div>

        <div className="project-preview-panel">
          <div>
            <p className="paper-meta">{featuredProjects.length} research pages</p>
            <h3>Recent research</h3>
          </div>
          <div className="project-preview-strip">
            {projectPreview.map((project) => (
              <article className="project-preview-tile" key={project.slug}>
                {project.heroImage ? (
                  <img src={withBasePath(project.heroImage)} alt={`${project.shortTitle} project preview`} />
                ) : (
                  <span className="project-placeholder" aria-hidden="true">{project.isPaper ? "📄" : "📌"}</span>
                )}
                <span>{project.shortTitle}</span>
              </article>
            ))}
            {hiddenProjectCount ? (
              <article className="project-preview-tile project-preview-more" aria-label={`${hiddenProjectCount} more research project pages`}>
                <span aria-hidden="true">…</span>
                <strong>+{hiddenProjectCount}</strong>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section id="history" className="section-shell section-card cv-grid portfolio-section-card">
        <div>
          <p className="eyebrow">History</p>
          <h2>{pageSummaries.history.title}</h2>
          <p>{pageSummaries.history.description}</p>
          <Link className="button secondary" href="/history/">
            Open
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
              <span aria-hidden="true">…</span>
              <strong>+{hiddenHistoryCount}</strong>
            </article>
          ) : null}
        </div>
      </section>

{activityProjects.length ? (
      <section id="activities" className="section-shell section-card cv-grid portfolio-section-card">
        <div>
          <p className="eyebrow">Coursework and Activities</p>
          <h2>{pageSummaries.activities.title}</h2>
          {pageSummaries.activities.description ? <p>{pageSummaries.activities.description}</p> : null}
          <Link className="button secondary" href="/activities/">
            Open
          </Link>
        </div>

        <div className="project-preview-panel">
          <div>
            <p className="paper-meta">{activityProjects.length} pages</p>
            <h3>Recent activities</h3>
          </div>
          <div className="project-preview-strip">
            {activityPreview.map((project) => (
              <article className="project-preview-tile" key={project.slug}>
                {project.heroImage ? (
                  <img src={withBasePath(project.heroImage)} alt={`${project.shortTitle} project preview`} />
                ) : (
                  <span className="project-placeholder" aria-hidden="true">{project.category.includes("Activity") ? "🎸" : "🧩"}</span>
                )}
                <span>{project.shortTitle}</span>
              </article>
            ))}
            {hiddenActivityCount ? (
              <article className="project-preview-tile project-preview-more" aria-label={`${hiddenActivityCount} more activity pages`}>
                <span aria-hidden="true">…</span>
                <strong>+{hiddenActivityCount}</strong>
              </article>
            ) : null}
          </div>
        </div>
      </section>
      ) : null}
    </main>
  );
}
