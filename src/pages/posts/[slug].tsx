import Head from "next/head";
import Layout from "../../components/Layout";
import TransitionEffect from "../../components/TransitionEffect";
import { getAllArticles, getArticleBySlug } from "../../lib/sanity.queries";
import { Article } from "../../types/article";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import CodeBlock from "../../components/article/CodeBlock";
import ReadingProgress from "../../components/article/ReadingProgress";
import TableOfContents from "../../components/article/TableOfContents";
import { extractHeadings, Heading } from "../../lib/headings";
import React from "react";

interface AdjacentArticle {
  slug: string;
  title: string;
}

interface PostProps {
  article: Article;
  headings: Heading[];
  prev: AdjacentArticle | null;
  next: AdjacentArticle | null;
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

const MotionArticle = motion.article;

// Custom components for PortableText
const buildComponents = (headingIds: Map<string, string>) => ({
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-8">
          <Image
            src={value.asset.url}
            alt={value.alt || " "}
            width={800}
            height={450}
            className="rounded-xl w-full h-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => (
      <CodeBlock
        code={value?.code || ""}
        language={value?.language}
        filename={value?.filename}
        highlightedLines={value?.highlightedLines}
      />
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 dark:text-light">
        {children}
      </h1>
    ),
    h2: ({ children, value }: any) => (
      <h2
        id={headingIds.get(value?._key)}
        className="text-3xl font-bold mt-12 mb-4 scroll-mt-28 dark:text-light"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }: any) => (
      <h3
        id={headingIds.get(value?._key)}
        className="text-2xl font-bold mt-8 mb-3 scroll-mt-28 dark:text-light"
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-3 dark:text-light">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary dark:border-primaryDark pl-4 italic my-4 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-800 dark:text-gray-300 leading-relaxed my-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-800 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 my-4 space-y-2 text-gray-800 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-dark dark:text-light">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primaryDark px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary dark:text-primaryDark hover:underline"
        >
          {children}
        </a>
      );
    },
  },
});

const Post: React.FC<PostProps> = ({ article, headings, prev, next }) => {
  const components = React.useMemo(
    () => buildComponents(new Map(headings.map((h) => [h.key, h.id]))),
    [headings]
  );
  const url = SITE_URL ? `${SITE_URL}/posts/${article.slug}` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: article.image || undefined,
    datePublished: article.publishedAt || undefined,
    author: article.author?.name
      ? { "@type": "Person", name: article.author.name }
      : undefined,
    mainEntityOfPage: url,
  };

  return (
    <>
      <Head>
        <title>{`${article.title} | Dimos`}</title>
        <meta name="description" content={article.summary} />
        {url && <link rel="canonical" href={url} />}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        {article.image && <meta property="og:image" content={article.image} />}
        {url && <meta property="og:url" content={url} />}
        {article.publishedAt && (
          <meta
            property="article:published_time"
            content={article.publishedAt}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <ReadingProgress />
      <TransitionEffect />
      <Layout>
        <main className="w-full mb-16 flex flex-col items-center overflow-visible dark:text-light">
          <div className="max-w-6xl w-full">
            <Link
              href="/articles"
              className="inline-flex items-center text-primary dark:text-primaryDark hover:underline mb-8"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Articles
            </Link>

            {/* Hero */}
            <MotionArticle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <header className="mb-12 max-w-4xl">
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-5xl lg:text-4xl xs:text-3xl font-bold leading-tight mb-5 dark:text-light">
                  {article.title}
                </h1>

                {article.summary && (
                  <p className="text-xl md:text-lg text-dark/70 dark:text-light/70 mb-6">
                    {article.summary}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-dark/70 dark:text-light/70">
                  {article.author?.name && (
                    <div className="flex items-center gap-2">
                      {typeof article.author.image === "string" && (
                        <span className="relative w-9 h-9 rounded-full overflow-hidden">
                          <Image
                            src={article.author.image}
                            alt={article.author.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      <span className="font-semibold text-dark dark:text-light">
                        {article.author.name}
                      </span>
                    </div>
                  )}
                  <time dateTime={article.publishedAt || undefined}>
                    {article.date}
                  </time>
                  {article.readTime && (
                    <>
                      <span aria-hidden>•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              </header>

              {article.image ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border-2 border-dark dark:border-light shadow-xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}

              {/* Body + table of contents */}
              <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-12 lg:grid-cols-1">
                <div className="max-w-3xl text-lg">
                  {article.content && (
                    <PortableText
                      value={article.content}
                      components={components}
                    />
                  )}
                </div>
                <aside className="lg:hidden">
                  <TableOfContents headings={headings} />
                </aside>
              </div>
            </MotionArticle>

            {/* Previous / next */}
            {(prev || next) && (
              <nav
                aria-label="More articles"
                className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-1"
              >
                {prev ? (
                  <Link
                    href={`/posts/${prev.slug}`}
                    className="p-5 rounded-xl border border-dark dark:border-light hover:border-primary dark:hover:border-primaryDark transition-colors"
                  >
                    <span className="text-xs uppercase tracking-wide text-primary dark:text-primaryDark">
                      ← Newer
                    </span>
                    <p className="font-bold mt-1">{prev.title}</p>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/posts/${next.slug}`}
                    className="p-5 rounded-xl border border-dark dark:border-light hover:border-primary dark:hover:border-primaryDark transition-colors text-right sm:text-left col-start-2 sm:col-start-1"
                  >
                    <span className="text-xs uppercase tracking-wide text-primary dark:text-primaryDark">
                      Older →
                    </span>
                    <p className="font-bold mt-1">{next.title}</p>
                  </Link>
                )}
              </nav>
            )}

            <div className="mt-16 text-center">
              <Link
                href="/articles"
                className="inline-block px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const article = await getArticleBySlug(slug);

    if (!article) {
      return {
        notFound: true,
      };
    }

    // Validate and clean the article data
    const cleanedArticle = {
      ...article,
      image: article.image || null,
      publishedAt: article.publishedAt || null,
      author: article.author
        ? {
            ...article.author,
            image: article.author.image || null,
          }
        : null,
      content: article.content || null,
      title: article.title || "",
      date: article.date || "",
      readTime: article.readTime || "",
      tags: Array.isArray(article.tags) ? article.tags : [],
    };

    // allArticles is ordered newest first
    const all = await getAllArticles();
    const idx = all.findIndex((a) => a.slug === slug);
    const pick = (a?: Article) => (a ? { slug: a.slug, title: a.title } : null);

    return {
      props: {
        article: cleanedArticle,
        headings: extractHeadings(cleanedArticle.content),
        prev: idx > 0 ? pick(all[idx - 1]) : null,
        next: idx >= 0 ? pick(all[idx + 1]) : null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
};

export default Post;