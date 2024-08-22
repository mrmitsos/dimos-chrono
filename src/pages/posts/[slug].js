import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import BlogLayout from "../../components/BlogLayout";

const postsDirectory = path.join(process.cwd(), "data/posts");

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(postsDirectory);
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontmatter: data,
      contentHtml,
    },
  };
}

const Post = ({ frontmatter, contentHtml }) => {
  return (
    <BlogLayout title={frontmatter.title} description={frontmatter.summary}>
      <article>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </BlogLayout>
  );
};

export default Post;
