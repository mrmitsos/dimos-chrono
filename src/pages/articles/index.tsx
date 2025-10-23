import AnimatedText from "../../components/AnimatedText";
import Layout from "../../components/Layout";
import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import TransitionEffect from "../../components/TransitionEffect";
import { getFeaturedArticles, getAllArticles } from "../../lib/sanity.queries";
import { Article } from "../../types/article";
import { GetStaticProps } from "next";

const FramerImage = motion(Image);

interface MovingImgProps {
  title: string;
  img: string;
  link: string;
}

const MovingImg: React.FC<MovingImgProps> = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleMouse(event: React.MouseEvent) {
    if (imgRef.current) {
      imgRef.current.style.display = "inline-block";
      x.set(event.pageX);
      y.set(-10);
    }
  }

  function handleMouseLeave() {
    if (imgRef.current) {
      imgRef.current.style.display = "none";
      x.set(0);
      y.set(0);
    }
  }

  return (
    <Link
      href={link}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="capitalize text-xl font-semibold hover:underline">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        initial={{ opacity: 0 }}
        ref={imgRef}
        src={img}
        alt={title}
        width={384}
        height={216}
        className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
      />
    </Link>
  );
};

interface ArticleItemProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      viewport={{ once: true }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center
       justify-between bg-light text-dark first:mt-0 border 
       border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light 
       sm:flex-col"
    >
      <MovingImg
        title={article.title}
        img={article.image}
        link={`/posts/${article.slug}`}
      />
      <span className="text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm">
        {article.date}
      </span>
    </motion.li>
  );
};

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <li className="col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl relative dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl" />
      <Link
        href={`/posts/${article.slug}`}
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={article.image}
          alt={article.title}
          width={800}
          height={450}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={`/posts/${article.slug}`}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {article.title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{article.summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {article.readTime}
      </span>
    </li>
  );
};

interface ArticlesProps {
  featuredArticles: Article[];
  allArticles: Article[];
}

const Articles: React.FC<ArticlesProps> = ({
  featuredArticles,
  allArticles,
}) => {
  return (
    <>
      <Head>
        <title>Dimos | Articles</title>
        <meta
          name="description"
          content="Read my articles on web development, React, and more"
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Words Can Change The World!"
            className="mb-16 lg:!text-7xl sm:!mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            {featuredArticles.map((article) => (
              <FeaturedArticle key={article.slug} article={article} />
            ))}
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            All Articles
          </h2>
          <ul>
            {allArticles.map((article) => (
              <ArticleItem key={article.slug} article={article} />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredArticles = await getFeaturedArticles(); // Add await
  const allArticles = await getAllArticles(); // Add await

  return {
    props: {
      featuredArticles,
      allArticles,
    },
    revalidate: 60, // Revalidate every 60 seconds (ISR)
  };
};

export default Articles;