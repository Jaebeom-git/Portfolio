import { firstParagraph, getString, getStringArray, readMarkdown } from "./markdownContent";
import { absoluteUrl } from "./site";

const portfolioProjectPath = "/projects/cop-limiter/";
const portfolioProjectUrl = absoluteUrl(portfolioProjectPath);

const copLimiterMarkdown = readMarkdown("projects/cop-limiter/index.md");

export const copLimiterProject = {
  slug: "cop-limiter",
  title: getString(copLimiterMarkdown, "title", "Joint torque estimation from daily living motion for passive sarcopenia monitoring in older adults"),
  shortTitle: getString(copLimiterMarkdown, "shortTitle", "MAISE / CoP-Limiter"),
  subtitle: getString(copLimiterMarkdown, "subtitle", "Physically plausible ground-reaction-force estimation for motion-based joint torque analysis"),
  year: getString(copLimiterMarkdown, "year", "2026"),
  published: getString(copLimiterMarkdown, "published", "2026-04-05"),
  venue: getString(copLimiterMarkdown, "venue", "Journal of NeuroEngineering and Rehabilitation"),
  doi: getString(copLimiterMarkdown, "doi", "10.1186/s12984-026-01962-3"),
  codeUrl: getString(copLimiterMarkdown, "codeUrl", "https://github.com/Jaebeom-git/cop-limiter"),
  routePath: portfolioProjectPath,
  heroImage: getString(copLimiterMarkdown, "heroImage", "/projects/cop-limiter/figure-1-app.png"),
  summary: firstParagraph(copLimiterMarkdown.body),
  authors: getStringArray(copLimiterMarkdown, "authors", ["Jaebeom Jo", "Kihyun Kim", "Min-gu Kang", "Kanghyun Ryu", "Junhyoung Ha", "Jiyeon Kang"]),
  keywords: getStringArray(copLimiterMarkdown, "keywords", [
    "MAISE",
    "sarcopenia",
    "joint torque estimation",
    "CoP-Limiter",
    "ground reaction force estimation",
    "biomechanics",
    "older adults",
    "motion analysis",
    "cop-limiter",
  ]),
} as const;

export const copLimiterJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchProject",
  name: copLimiterProject.title,
  url: portfolioProjectUrl,
  description:
    "This page connects the published MAISE paper with the official CoP-Limiter implementation for motion-based GRF estimation and joint torque analysis.",
  sameAs: [`https://doi.org/${copLimiterProject.doi}`, copLimiterProject.codeUrl],
  subjectOf: {
    "@type": "ScholarlyArticle",
    headline: copLimiterProject.title,
    datePublished: copLimiterProject.published,
    identifier: `https://doi.org/${copLimiterProject.doi}`,
    publisher: {
      "@type": "Organization",
      name: copLimiterProject.venue,
    },
    author: copLimiterProject.authors.map((name) => ({ "@type": "Person", name })),
  },
  codeRepository: copLimiterProject.codeUrl,
};
