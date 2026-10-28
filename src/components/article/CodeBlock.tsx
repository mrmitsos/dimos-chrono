import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightedLines?: number[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "text",
  filename,
  highlightedLines = [],
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; ignore
    }
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-dark dark:border-light/40 shadow-lg">
      <div className="flex items-center justify-between bg-[#0b1220] px-4 py-2 text-xs text-gray-400">
        <span className="font-mono">{filename || language}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded px-2 py-1 hover:bg-white/10 hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <Highlight
        theme={themes.nightOwl}
        code={code.replace(/\n$/, "")}
        language={language === "js" ? "javascript" : language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{ ...style, margin: 0 }}
            className="overflow-x-auto p-4 text-sm leading-relaxed"
          >
            {tokens.map((line, i) => {
              const hl = highlightedLines.includes(i + 1);
              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={hl ? "bg-white/10 -mx-4 px-4" : ""}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
