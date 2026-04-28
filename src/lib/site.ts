const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Portfolio";
const isUserSite = repositoryName.endsWith(".github.io");

export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.GITHUB_ACTIONS && repositoryName && !isUserSite ? `/${repositoryName}` : "");

const defaultSiteUrl = `https://jaebeom-git.github.io${basePath || "/Portfolio"}`;

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const siteUrl = (configuredSiteUrl || defaultSiteUrl).replace(/\/$/, "");

export const site = {
  name: "Jaebeom's Portfolio",
  owner: "Jaebeom Jo",
  title: "Jaebeom's Portfolio",
  description: "Curriculum vitae, research projects, and academic history of Jaebeom Jo.",
  url: siteUrl,
  image: `${siteUrl}/profile/jaebeom-profile.png`,
};

export function withBasePath(path: string) {
  if (!basePath) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(path = "") {
  if (/^https?:\/\//.test(path)) return path;
  const cleanPath = path.replace(/^\/+/, "");
  return cleanPath ? `${site.url}/${cleanPath}` : `${site.url}/`;
}
