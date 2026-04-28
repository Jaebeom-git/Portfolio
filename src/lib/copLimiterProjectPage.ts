import fs from "node:fs";
import path from "node:path";
import { firstParagraph, getString, getStringArray, readMarkdown } from "./markdownContent";
import { absoluteUrl, withBasePath } from "./site";

const projectPagePath = path.join(process.cwd(), "content", "papers", "cop-limiter", "project-page.html");
const retiredProjectUrl = "https://jaebeom-git.github.io/cop-limiter/";
const portfolioProjectPath = "/projects/cop-limiter/";
const portfolioProjectUrl = absoluteUrl(portfolioProjectPath);
const portfolioAssetPath = withBasePath("/papers/cop-limiter/");

const copLimiterMarkdown = readMarkdown("projects/cop-limiter.md");

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
  heroImage: getString(copLimiterMarkdown, "heroImage", "/papers/cop-limiter/figure-1-app.png"),
  summary: firstParagraph(copLimiterMarkdown.body),
  authors: ["Jaebeom Jo", "Kihyun Kim", "Min-gu Kang", "Kanghyun Ryu", "Junhyoung Ha", "Jiyeon Kang"],
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

function extractBetween(source: string, startPattern: RegExp, endPattern: RegExp, label: string) {
  const startMatch = source.match(startPattern);
  const endMatch = source.match(endPattern);
  if (!startMatch || startMatch.index === undefined || !endMatch || endMatch.index === undefined) {
    throw new Error(`Could not extract ${label} from CoP-Limiter project page`);
  }
  const start = startMatch.index + startMatch[0].length;
  return source.slice(start, endMatch.index).trim();
}

function rewriteProjectPageHtml(html: string) {
  return html
    .replaceAll(retiredProjectUrl, portfolioProjectUrl)
    .replaceAll('href="./"', `href="${withBasePath(portfolioProjectPath)}"`)
    .replaceAll('src="assets/', `src="${portfolioAssetPath}`);
}

export function getCopLimiterProjectPage() {
  const html = fs.readFileSync(projectPagePath, "utf8");
  const style = extractBetween(html, /<style>/i, /<\/style>/i, "style");
  const body = extractBetween(html, /<body>/i, /<\/body>/i, "body");

  return {
    style,
    body: rewriteProjectPageHtml(body),
  };
}

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
