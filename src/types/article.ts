export interface Article {
  slug: string;
  title: string;
  summary: string;
  content: any;
  date: string;
  readTime: string;
  image: string;
  isFeatured: boolean;
  author?: {
    name: string;
    image: string | null;
  };
  tags?: string[];
}

export interface ArticleCardProps {
  article: Article;
}

export interface FeaturedArticleProps {
  article: Article;
}