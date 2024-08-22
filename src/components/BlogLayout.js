import Head from "next/head";
import Layout from "./Layout";
import { useRouter } from "next/router";
import TransitionEffect from "@/components/TransitionEffect";

const BlogLayout = ({ children, title, description }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title ? `${title}` : "My Blog"}</title>
        <meta name="description" content={description || "My articles"} />
      </Head>
      <TransitionEffect />
      <Layout>
        <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
          <h1 className="font-bold text-4xl w-full text-center mb-32">
            {title}
          </h1>
          {children}
        </main>
      </Layout>
    </>
  );
};

export default BlogLayout;
