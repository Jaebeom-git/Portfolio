import Link from "next/link";

type ArchiveProject = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  status: string;
  period: string;
  year: string;
  sortDate: string;
  published: string;
  startDate: string;
  routePath: string;
  heroImage: string;
  isPaper: boolean;
  group: string;
  keywords: string[];
};

type ArchiveMode = "research" | "activities";

function sortValue(project: ArchiveProject) {
  const parsed = Date.parse(project.sortDate || project.published || project.startDate);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function placeholder(project: ArchiveProject) {
  if (project.isPaper) return "📄";
  if (project.group === "activity") return "🎸";
  return "🧩";
}

function projectMeta(project: ArchiveProject) {
  const dateLabel = project.isPaper ? project.year || project.published || project.period : project.period || project.year;
  return [project.category, dateLabel, project.status].filter(Boolean).join(" · ");
}

function ProjectCards({ projects, view }: { projects: ArchiveProject[]; view: "gallery" | "list" }) {
  if (view === "list") {
    return (
      <div className="project-list-view is-visible">
        {projects.map((project) => (
          <Link className="project-list-card filterable-project-card" href={project.routePath} key={project.slug} data-paper={String(project.isPaper)} data-group={project.group}>
            {project.heroImage ? (
              <img className="project-list-thumb" src={project.heroImage} alt={`${project.shortTitle} project preview`} />
            ) : (
              <span className="project-list-thumb project-list-placeholder" aria-hidden="true">{placeholder(project)}</span>
            )}
            <div>
              <p className="paper-meta">{projectMeta(project)}</p>
              <h2>{project.shortTitle}</h2>
              <p>{project.title}</p>
            </div>
            <span>Open →</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="project-gallery full-gallery project-gallery-view">
      {projects.map((project) => (
        <Link className="project-gallery-card filterable-project-card" href={project.routePath} key={project.slug} data-paper={String(project.isPaper)} data-group={project.group}>
          {project.heroImage ? (
            <img src={project.heroImage} alt={`${project.shortTitle} project preview`} />
          ) : (
            <span className="project-placeholder" aria-hidden="true">{placeholder(project)}</span>
          )}
          <div>
            <p className="paper-meta">{projectMeta(project)}</p>
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
  );
}

export function ProjectArchive({ mode, projects }: { mode: ArchiveMode; projects: ArchiveProject[] }) {
  const isResearch = mode === "research";
  const newestProjects = [...projects].sort((a, b) => sortValue(b) - sortValue(a));
  const oldestProjects = [...projects].sort((a, b) => sortValue(a) - sortValue(b));

  return (
    <section className={`section-shell project-browser project-browser-${mode}`}>
      <input className="project-toggle-input" type="radio" name={`${mode}-filter`} id={`${mode}-filter-all`} defaultChecked />
      <input className="project-toggle-input" type="radio" name={`${mode}-filter`} id={`${mode}-filter-secondary`} />
      <input className="project-toggle-input" type="radio" name={`${mode}-sort`} id={`${mode}-sort-newest`} defaultChecked />
      <input className="project-toggle-input" type="radio" name={`${mode}-sort`} id={`${mode}-sort-oldest`} />
      <input className="project-toggle-input" type="radio" name={`${mode}-view`} id={`${mode}-view-gallery`} defaultChecked />
      <input className="project-toggle-input" type="radio" name={`${mode}-view`} id={`${mode}-view-list`} />

      <div className="project-browser-toolbar">
        <div>
          <p className="paper-meta">{projects.length} pages</p>
        </div>
        <div className="project-controls">
          <div className="view-switch" aria-label={isResearch ? "Project filter" : "Coursework filter"}>
            <label htmlFor={`${mode}-filter-all`}>All</label>
            <label htmlFor={`${mode}-filter-secondary`}>{isResearch ? "Papers" : "Coursework"}</label>
          </div>
          <div className="view-switch" aria-label="Sort mode">
            <label htmlFor={`${mode}-sort-newest`}>Newest</label>
            <label htmlFor={`${mode}-sort-oldest`}>Oldest</label>
          </div>
          <div className="view-switch" aria-label="View mode">
            <label htmlFor={`${mode}-view-gallery`}>Gallery</label>
            <label htmlFor={`${mode}-view-list`}>List</label>
          </div>
        </div>
      </div>

      <div className="project-panels">
        <div className="project-panel project-panel-newest-gallery"><ProjectCards projects={newestProjects} view="gallery" /></div>
        <div className="project-panel project-panel-newest-list"><ProjectCards projects={newestProjects} view="list" /></div>
        <div className="project-panel project-panel-oldest-gallery"><ProjectCards projects={oldestProjects} view="gallery" /></div>
        <div className="project-panel project-panel-oldest-list"><ProjectCards projects={oldestProjects} view="list" /></div>
      </div>
    </section>
  );
}
