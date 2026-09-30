import { marked } from "marked";
import katex from "katex";

export interface Frontmatter {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  draft?: boolean;
  collection?: string;
  permalink?: string;
  [key: string]: unknown;
}

export interface ParsedMarkdown {
  frontmatter: Frontmatter;
  content: string;
  html: string;
  readingTimeMinutes: number;
}

/**
 * Parses frontmatter from a markdown string.
 */
export function parseFrontmatter(fileContent: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = fileContent.slice(match[0].length);
  const frontmatter: Frontmatter = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentArrayKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentArrayKey) {
      const value = trimmed.slice(2).trim().replace(/^["']|["']$/g, "");
      if (Array.isArray(frontmatter[currentArrayKey])) {
        (frontmatter[currentArrayKey] as string[]).push(value);
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const rawVal = line.slice(colonIndex + 1).trim();

      if (rawVal === "" || rawVal === "[]") {
        frontmatter[key] = [];
        currentArrayKey = key;
      } else {
        currentArrayKey = null;
        let parsedVal: string | boolean | number = rawVal.replace(/^["']|["']$/g, "");
        if (parsedVal === "true") parsedVal = true;
        else if (parsedVal === "false") parsedVal = false;
        else if (!isNaN(Number(parsedVal)) && rawVal !== "") parsedVal = Number(parsedVal);
        frontmatter[key] = parsedVal;
      }
    }
  }

  return { frontmatter, content };
}

/**
 * Preprocesses markdown text to render KaTeX math expressions at build time while protecting code blocks.
 */
export function renderMath(markdownText: string): string {
  const codeBlocks: string[] = [];

  // Protect multi-line code blocks
  let protectedText = markdownText.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Protect inline code blocks
  protectedText = protectedText.replace(/`[^`\n]+`/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Render display math: $$...$$
  protectedText = protectedText.replace(/\$\$([\s\S]+?)\$\$/g, (_, equation) => {
    try {
      return katex.renderToString(equation.trim(), {
        displayMode: true,
        throwOnError: false,
        output: "html",
      });
    } catch {
      return `$$${equation}$$`;
    }
  });

  // Render inline math: $...$ (avoiding dollar signs like $10 or $$)
  protectedText = protectedText.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, equation) => {
    try {
      return katex.renderToString(equation.trim(), {
        displayMode: false,
        throwOnError: false,
        output: "html",
      });
    } catch {
      return `$${equation}$`;
    }
  });

  // Restore protected code blocks
  protectedText = protectedText.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    return codeBlocks[parseInt(index, 10)] || "";
  });

  return protectedText;
}

/**
 * Full pipeline: parses frontmatter, renders KaTeX math, and converts to HTML.
 */
export async function processMarkdown(fileContent: string): Promise<ParsedMarkdown> {
  const { frontmatter, content } = parseFrontmatter(fileContent);
  const mathProcessed = renderMath(content);
  const html = await marked.parse(mathProcessed);

  const wordCount = content.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    frontmatter,
    content,
    html,
    readingTimeMinutes,
  };
}
