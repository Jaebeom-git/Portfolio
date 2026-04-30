import fs from "node:fs";
import path from "node:path";

type FrontMatterValue = string | string[];
export type MarkdownDocument = {
  data: Record<string, FrontMatterValue>;
  body: string;
  slug?: string;
  relativePath?: string;
};

const contentRoot = path.join(process.cwd(), "content");

function parseValue(key: string, value: string): FrontMatterValue {
  const trimmed = value.trim();
  const bracketList = trimmed.match(/^\[(.*)\]$/);

  if (bracketList) {
    return value
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (key === "keywords" || key === "tags") {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return trimmed;
}

export function readMarkdown(relativePath: string): MarkdownDocument {
  const source = fs.readFileSync(path.join(contentRoot, relativePath), "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source.trim(), relativePath };

  const [, frontMatter, body] = match;
  const data: Record<string, FrontMatterValue> = {};

  for (const line of frontMatter.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = parseValue(key, value);
  }

  return { data, body: body.trim(), relativePath };
}

export function readMarkdownDirectory(relativeDir: string) {
  const absoluteDir = path.join(contentRoot, relativeDir);
  return fs
    .readdirSync(absoluteDir)
    .filter((file) => {
      const absolutePath = path.join(absoluteDir, file);
      if (file.endsWith(".md")) return true;
      return fs.statSync(absolutePath).isDirectory() && fs.existsSync(path.join(absolutePath, "index.md"));
    })
    .sort()
    .map((file) => {
      const absolutePath = path.join(absoluteDir, file);
      const isDirectory = fs.statSync(absolutePath).isDirectory();
      const relativePath = isDirectory ? path.join(relativeDir, file, "index.md") : path.join(relativeDir, file);
      const doc = readMarkdown(relativePath);
      return { ...doc, slug: isDirectory ? file : file.replace(/\.md$/, "") };
    });
}

export function getString(doc: MarkdownDocument, key: string, fallback = "") {
  const value = doc.data[key];
  return typeof value === "string" ? value : fallback;
}

export function getStringArray(doc: MarkdownDocument, key: string, fallback: string[] = []) {
  const value = doc.data[key];
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value) return [value];
  return fallback;
}

export function firstParagraph(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#")) ?? "";
}

export function markdownSections(markdown: string) {
  const sections: Array<{ title: string; body: string }> = [];
  let current: { title: string; body: string[] } | undefined;

  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      if (current) sections.push({ title: current.title, body: current.body.join("\n").trim() });
      current = { title: heading[1], body: [] };
      continue;
    }
    if (current) current.body.push(line);
  }

  if (current) sections.push({ title: current.title, body: current.body.join("\n").trim() });
  return sections;
}

export function markdownList(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^(-|\d+\.)\s+/.test(line))
    .map((line) => line.replace(/^(-|\d+\.)\s+/, ""));
}

export function inlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}
