import type { ReactNode } from "react";
import { slugifyHeading } from "@/lib/archive/mdxUtils";

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ color: "var(--fg)", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function ArchiveMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line === "---") {
      nodes.push(<hr key={index} style={{ margin: "48px 0", border: 0, borderTop: "1px solid var(--line)" }} />);
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      nodes.push(
        <h2
          key={index}
          id={slugifyHeading(text)}
          style={{
            scrollMarginTop: 110,
            marginTop: 52,
            marginBottom: 16,
            color: "var(--fg)",
            fontSize: "clamp(26px, 3vw, 42px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            fontWeight: 850,
          }}
        >
          {text}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      nodes.push(
        <h3
          key={index}
          id={slugifyHeading(text)}
          style={{
            scrollMarginTop: 110,
            marginTop: 34,
            marginBottom: 12,
            color: "var(--fg)",
            fontSize: "clamp(20px, 2vw, 28px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            fontWeight: 760,
          }}
        >
          {text}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trimStart().startsWith("> ")) {
        quoteLines.push(lines[index].trimStart().slice(2));
        index += 1;
      }
      nodes.push(
        <blockquote
          key={`quote-${index}`}
          style={{
            margin: "42px 0",
            padding: "8px 0 8px 24px",
            borderLeft: "1px solid var(--accent)",
            color: "var(--fg)",
          }}
        >
          {quoteLines.map((quoteLine, quoteIndex) => (
            <p
              key={quoteIndex}
              style={{
                margin: quoteIndex === quoteLines.length - 1 ? 0 : "0 0 12px",
                color: "var(--fg-dim)",
                fontSize: "clamp(16px, 1.35vw, 19px)",
                lineHeight: 1.82,
                fontWeight: 300,
              }}
            >
              {renderInline(quoteLine)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trimStart().startsWith("- ")) {
        items.push(lines[index].trimStart().slice(2));
        index += 1;
      }
      nodes.push(
        <ul
          key={`list-${index}`}
          style={{
            margin: "0 0 28px",
            paddingLeft: 22,
            color: "var(--fg-dim)",
            lineHeight: 1.8,
          }}
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex} style={{ marginBottom: 8, fontSize: "clamp(15px, 1.25vw, 18px)" }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("## ") &&
      !lines[index].startsWith("### ") &&
      !lines[index].trimStart().startsWith("- ") &&
      !lines[index].trimStart().startsWith("> ") &&
      lines[index].trim() !== "---"
    ) {
      paragraphLines.push(lines[index].trimEnd());
      index += 1;
    }

    nodes.push(
      <p
        key={`p-${index}`}
        style={{
          margin: "0 0 22px",
          color: "var(--fg-dim)",
          fontSize: "clamp(16px, 1.35vw, 19px)",
          lineHeight: 1.82,
          fontWeight: 300,
          letterSpacing: "-0.005em",
        }}
      >
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <>{nodes}</>;
}
