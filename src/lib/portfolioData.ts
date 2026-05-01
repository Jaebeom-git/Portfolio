import { copLimiterProject } from "@/src/lib/copLimiterProjectPage";
import {
  firstParagraph,
  getString,
  getStringArray,
  markdownList,
  markdownSections,
  readMarkdown,
  readMarkdownDirectory,
  readOptionalMarkdown,
} from "@/src/lib/markdownContent";

const profileDoc = readMarkdown("profile/summary.md");
const cvDocs = {
  summary: readMarkdown("cv/summary.md"),
  highlights: readMarkdown("cv/highlights.md"),
  education: readMarkdown("cv/education.md"),
  publications: readMarkdown("cv/publications.md"),
  awards: readMarkdown("cv/awards.md"),
  skills: readMarkdown("cv/skills.md"),
  researchExperiences: readMarkdown("cv/research-experiences.md"),
};
const projectDocs = {
  index: readMarkdown("projects/index.md"),
  pages: readMarkdownDirectory("projects").filter((doc) => doc.slug !== "index"),
};
const activityDocs = {
  index: readOptionalMarkdown("activities/index.md"),
  pages: readMarkdownDirectory("activities").filter((doc) => doc.slug !== "index"),
};
const historyDocs = {
  index: readMarkdown("history/index.md"),
  pages: readMarkdownDirectory("history").filter((doc) => doc.slug !== "index"),
};

const highlightIcons: Record<string, string> = {
  Education: "🎓",
  Publications: "🧾",
  Experience: "💼",
  Skills: "🛠️",
  "Awards and Honors": "🏅",
};

const historyIcons: Record<string, string> = {
  "Master’s Degree": "🎓",
  "Bachelor’s Degree": "🏫",
  "KIMM Researcher": "🔬",
};

function pageSummary(doc: ReturnType<typeof readMarkdown>, fallbackTitle: string) {
  return {
    title: getString(doc, "title", fallbackTitle),
    description: getString(doc, "description", firstParagraph(doc.body)),
  };
}

export const profile = {
  koreanName: getString(profileDoc, "koreanName", "조재범"),
  englishName: getString(profileDoc, "englishName", "Jaebeom Jo"),
  email: getString(profileDoc, "email", "jojaebeom@gm.gist.ac.kr"),
  linkedin: getString(profileDoc, "linkedin", "https://www.linkedin.com/in/jaebeom-jo/"),
  scholar: getString(profileDoc, "scholar", "https://scholar.google.com/citations?user=e8txR3gAAAAJ&hl=ko"),
  photo: getString(profileDoc, "photo", "/profile/jaebeom-profile.png"),
  cvPhoto: getString(profileDoc, "cvPhoto", "/profile/jaebeom-id-20230510-w3h4.png"),
};

export const pageSummaries = {
  cv: pageSummary(cvDocs.summary, "C.V."),
  projects: pageSummary(projectDocs.index, "Research and Projects"),
  activities: pageSummary(activityDocs.index, "Coursework and Activities"),
  history: pageSummary(historyDocs.index, "Education and Experience"),
} as const;

export const cvHighlights = markdownSections(cvDocs.highlights.body).map((section) => ({
  icon: highlightIcons[section.title] ?? "•",
  title: section.title,
  detail: firstParagraph(section.body),
  href: `#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
}));

export const education = markdownSections(cvDocs.education.body).map((section) => ({
  degree: section.title,
  lines: section.body.split("\n").map((line) => line.trim()).filter(Boolean),
}));

export const publications = markdownSections(cvDocs.publications.body).map((section) => ({
  title: section.title,
  items: markdownList(section.body),
}));

export const researchExperiences = markdownList(cvDocs.researchExperiences.body);
export const awards = markdownList(cvDocs.awards.body);
export const skills = markdownList(cvDocs.skills.body);

function inferProjectGroup(doc: ReturnType<typeof readMarkdown>, category: string, isPaper: boolean) {
  const explicitGroup = getString(doc, "group", "").toLowerCase();
  if (["research", "coursework", "activity"].includes(explicitGroup)) return explicitGroup;

  const normalizedCategory = category.toLowerCase();
  if (normalizedCategory.includes("competition") || /domestic conferences?/i.test(doc.body)) return "research";
  if (isPaper || normalizedCategory.includes("paper") || normalizedCategory.includes("research")) return "research";
  if (normalizedCategory.includes("activity")) return "activity";
  return "coursework";
}

const projectCards = [...projectDocs.pages, ...activityDocs.pages].map((doc) => {
  const slug = doc.slug ?? "";
  const isCopLimiter = slug === copLimiterProject.slug;
  const isPaper = getString(doc, "isPaper", isCopLimiter ? "true" : "false").toLowerCase() === "true";
  const category = getString(doc, "category", isPaper ? "Paper" : "Project");
  const group = inferProjectGroup(doc, category, isPaper);
  const koreanTitle = getString(doc, "koreanTitle", "");
  const keywords = getStringArray(doc, "keywords", []);

  return {
    slug,
    title: getString(doc, "title", isCopLimiter ? copLimiterProject.title : slug),
    titleSuffix: getString(doc, "titleSuffix", ""),
    topbarTitle: getString(doc, "topbarTitle", ""),
    shortTitle: getString(doc, "shortTitle", isCopLimiter ? copLimiterProject.shortTitle : slug),
    subtitle: getString(doc, "subtitle", firstParagraph(doc.body)),
    koreanTitle,
    layout: getString(doc, "layout", "default-project"),
    heroEyebrow: getString(doc, "heroEyebrow", ""),
    abstractHeading: getString(doc, "abstractHeading", ""),
    posterHeading: getString(doc, "posterHeading", ""),
    citationIntro: getString(doc, "citationIntro", ""),
    category,
    group,
    isListed: getString(doc, "listed", "true").toLowerCase() !== "false",
    status: getString(doc, "status", ""),
    period: getString(doc, "period", ""),
    year: getString(doc, "year", ""),
    startDate: getString(doc, "startDate", ""),
    endDate: getString(doc, "endDate", ""),
    published: getString(doc, "published", ""),
    publishedLabel: getString(doc, "publishedLabel", ""),
    venue: getString(doc, "venue", ""),
    doi: getString(doc, "doi", ""),
    codeUrl: getString(doc, "codeUrl", ""),
    paperUrl: getString(doc, "paperUrl", ""),
    pageUrl: getString(doc, "pageUrl", ""),
    showLinks: getString(doc, "showLinks", "").toLowerCase() === "true",
    source: getString(doc, "source", ""),
    isPaper,
    routePath: isCopLimiter ? copLimiterProject.routePath : group === "research" ? `/projects/${slug}/` : `/activities/${slug}/`,
    heroImage: getString(doc, "heroImage", isCopLimiter ? copLimiterProject.heroImage : ""),
    authors: getStringArray(doc, "authors", []),
    keywords: koreanTitle ? [...keywords, koreanTitle] : keywords,
    body: doc.body,
    sections: markdownSections(doc.body),
    sortDate: getString(doc, "endDate", getString(doc, "published", getString(doc, "startDate", ""))),
  };
});

const sortedProjectCards = [...projectCards].sort(
  (a, b) => sortableDate(b.sortDate || b.published || b.startDate) - sortableDate(a.sortDate || a.published || a.startDate),
);

export const allProjects = sortedProjectCards;

export const projectPages = allProjects.filter((project) => project.group === "research");

export const featuredProjects = projectPages.filter((project) => project.isListed);

export const activityProjects = allProjects.filter((project) => project.group !== "research");

export const portfolioSections = [
  {
    icon: "📄",
    label: "Curriculum Vitae",
    href: "/cv/",
    anchor: "#cv",
    summary: "Education, publications, awards, skills",
  },
  {
    icon: "📌",
    label: "Research and Projects",
    href: "/projects/",
    anchor: "#projects",
    summary: "Selected research and implementation pages",
  },
  {
    icon: "🗂️",
    label: "History",
    href: "/history/",
    anchor: "#history",
    summary: "Education and experience timeline",
  },
  ...(activityProjects.length
    ? [{
        icon: "🧩",
        label: "Coursework and Activities",
        href: "/activities/",
        anchor: "#activities",
        summary: "Coursework, competitions, and activities",
      }]
    : []),
] as const;

export const sitemapProjects = allProjects.filter((project) => project.isListed);

export const paperProjects = featuredProjects.filter((project) => project.isPaper);

function sortableDate(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export const historyItems = historyDocs.pages
  .map((doc) => {
    const title = getString(doc, "title", doc.slug ?? "");
    return {
      slug: doc.slug ?? title,
      icon: getString(doc, "icon", historyIcons[title] ?? "•"),
      iconImage: getString(doc, "iconImage", ""),
      title,
      detail: getString(doc, "detail", firstParagraph(doc.body)),
      period: getString(doc, "period", ""),
      isPresent: /present/i.test(getString(doc, "period", "")),
      startDate: getString(doc, "startDate", ""),
      endDate: getString(doc, "endDate", ""),
      body: doc.body,
      sortDate: getString(doc, "sortDate", ""),
    };
  })
  .sort((a, b) => sortableDate(b.startDate || b.sortDate) - sortableDate(a.startDate || a.sortDate));
