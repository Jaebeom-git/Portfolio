import { copLimiterProject } from "@/src/lib/copLimiterProjectPage";
import {
  firstParagraph,
  getString,
  getStringArray,
  markdownList,
  markdownSections,
  readMarkdown,
  readMarkdownDirectory,
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
] as const;

export const pageSummaries = {
  cv: pageSummary(cvDocs.summary, "C.V."),
  projects: pageSummary(projectDocs.index, "Research and Projects"),
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

const projectCards = projectDocs.pages.map((doc) => {
  const slug = doc.slug ?? "";
  const isCopLimiter = slug === copLimiterProject.slug;
  return {
    slug,
    title: getString(doc, "title", isCopLimiter ? copLimiterProject.title : slug),
    shortTitle: getString(doc, "shortTitle", isCopLimiter ? copLimiterProject.shortTitle : slug),
    subtitle: getString(doc, "subtitle", firstParagraph(doc.body)),
    year: getString(doc, "year", ""),
    published: getString(doc, "published", ""),
    venue: getString(doc, "venue", ""),
    routePath: isCopLimiter ? copLimiterProject.routePath : `/projects/${slug}/`,
    heroImage: getString(doc, "heroImage", isCopLimiter ? copLimiterProject.heroImage : ""),
    keywords: getStringArray(doc, "keywords", []),
  };
});

export const featuredProjects = [...projectCards].sort(
  (a, b) => sortableDate(b.published) - sortableDate(a.published),
);

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
