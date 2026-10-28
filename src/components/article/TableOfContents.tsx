import React, { useEffect, useState } from "react";
import { Heading } from "../../lib/headings";

const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-10% 0px -75% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28 text-sm">
      <p className="font-bold uppercase tracking-wide mb-3 dark:text-light">
        On this page
      </p>
      <ul className="border-l border-dark/20 dark:border-light/20">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-1 -ml-px border-l-2 transition-colors ${
                h.level === 3 ? "pl-6" : "pl-3"
              } ${
                active === h.id
                  ? "border-primary text-primary dark:border-primaryDark dark:text-primaryDark font-semibold"
                  : "border-transparent text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primaryDark"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
