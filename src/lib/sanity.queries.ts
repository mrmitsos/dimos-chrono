import { client } from "./sanity.client";
import { Article } from "../types/article";

// GROQ query to get all articles
const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  summary,
  "image": mainImage.asset->url,
  "date": publishedAt,
  readTime,
  isFeatured,
  "author": {
    "name": author.name,
    "image": author.image.asset->url
  },
  tags,
  content
}`;

// Query for featured articles only
const featuredArticlesQuery = `*[_type == "article" && isFeatured == true] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  summary,
  "image": mainImage.asset->url,
  "date": publishedAt,
  readTime,
  isFeatured,
  "author": {
    "name": author.name,
    "image": author.image.asset->url
  },
  tags,
  content
}`;

// Query for a single article by slug
const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  summary,
  "image": mainImage.asset->url,
  "date": publishedAt,
  readTime,
  isFeatured,
  "author": {
    "name": author.name,
    "image": author.image.asset->url
  },
  tags,
  content
}`;

export async function getAllArticles(): Promise<Article[]> {
  const articles = await client.fetch(articlesQuery);
  return articles.map((article: any) => ({
    ...article,
    date: article.date ? new Date(article.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
  }));
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await client.fetch(featuredArticlesQuery);
  return articles.map((article: any) => ({
    ...article,
    date: article.date ? new Date(article.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
  }));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await client.fetch(articleBySlugQuery, { slug });
  if (!article) return null;
  
  return {
    ...article,
    date: article.date ? new Date(article.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
  };
}