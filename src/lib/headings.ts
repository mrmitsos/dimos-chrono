import { toPlainText } from "@portabletext/react";

export interface Heading {
  id: string;
  key: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: any): Heading[] {
  if (!Array.isArray(content)) return [];
  const seen: Record<string, number> = {};
  return content
    .filter((b) => b?._type === "block" && (b.style === "h2" || b.style === "h3"))
    .map((b) => {
      const text = toPlainText(b);
      const base = slugifyHeading(text) || "section";
      seen[base] = (seen[base] ?? 0) + 1;
      return {
        key: b._key,
        id: seen[base] > 1 ? `${base}-${seen[base]}` : base,
        text,
        level: b.style === "h2" ? 2 : 3,
      } as Heading;
    });
}
