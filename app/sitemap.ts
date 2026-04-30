import type { MetadataRoute } from "next";
import { allProjects, portfolioSections } from "@/src/lib/portfolioData";
import { absoluteUrl } from "@/src/lib/site";

export const dynamic = "force-static";

function lastModified(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? new Date() : new Date(parsed);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...portfolioSections.map((section) => ({
      url: absoluteUrl(section.href),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...allProjects.map((project) => ({
      url: absoluteUrl(project.routePath),
      lastModified: lastModified(project.published),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
