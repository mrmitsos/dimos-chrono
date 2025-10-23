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
import React from "react";

interface PostProps {
  article: Article;
}

const MotionArticle = motion.article;

// Custom components for PortableText
const PortableTextComponents = {
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
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code className={`language-${value.language || "text"}`}>
            {value.code}
          </code>
        </pre>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 dark:text-light">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 dark:text-light">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3 dark:text-light">
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
};

const Post: React.FC<PostProps> = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article.title} | Dimos</title>
        <meta name="description" content={article.summary} />
      </Head>
      <TransitionEffect />
      <Layout>
        <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
          <div className="max-w-4xl w-full px-8 py-16">
            {/* Back button */}
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

            {/* Article header */}
            <MotionArticle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-light">
                  {article.title}
                </h1>

                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
                  <time dateTime={article.date}>{article.date}</time>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex gap-2 mb-8">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Featured image */}
                {article.image ? (
                  <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 border-4 border-dark dark:border-light">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}

                {/* Author info */}
                {article.author &&
                article.author.image &&
                typeof article.author.image === "string" ? (
                  <div className="flex items-center gap-4 p-4 bg-light dark:bg-dark border border-dark dark:border-light rounded-xl">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold dark:text-light">
                        {article.author.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Author
                      </p>
                    </div>
                  </div>
                ) : null}
              </header>

              {/* Article content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {article.content && (
                  <PortableText
                    value={article.content}
                    components={PortableTextComponents}
                  />
                )}
              </div>
            </MotionArticle>

            {/* Divider */}
            <div className="my-16 border-t border-dark/20 dark:border-light/20" />

            {/* CTA or Related articles section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 bg-gradient-to-r from-primary/10 to-primaryDark/10 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 dark:text-light">
                Want to read more?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Check out all my articles on web development and design
              </p>
              <Link
                href="/articles"
                className="inline-block px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                View All Articles
              </Link>
            </motion.div>
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const article = await getArticleBySlug(params?.slug as string);

    if (!article) {
      return {
        notFound: true,
      };
    }

    // Validate and clean the article data
    const cleanedArticle = {
      ...article,
      image: article.image || null,
      author: article.author
        ? {
            ...article.author,
            image: article.author.image || null,
          }
        : null,
      content: article.content || "",
      title: article.title || "",
      date: article.date || "",
      readTime: article.readTime || "",
      tags: Array.isArray(article.tags) ? article.tags : [],
    };

    return {
      props: {
        article: cleanedArticle,
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