import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import BlogLayout from "../../components/BlogLayout";

const postsDirectory = path.join(process.cwd(), "data/posts");

export async function getStaticProps() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title,
      summary: data.summary,
      date: data.date,
    };
  });

  return {
    props: {
      posts: allPosts,
    },
  };
}

const Posts = ({ posts }) => {
  return (
    <BlogLayout title="Dimos | Articles">
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
        {posts.map((post) => (
          <ul
            key={post.slug}
            className="relative w-full p-4 py-6 mb-4 rounded-xl flex flex-col items-center
       justify-between bg-light text-dark first:mt-0 border 
       border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light 
       sm:flex-col"
          >
            <Link legacyBehavior href={`/posts/${post.slug}`}>
              <a className="text-2xl font-bold">{post.title}</a>
            </Link>
            <p className="text-center">{post.summary}</p>
            <small>{post.date}</small>
          </ul>
        ))}
      </div>
    </BlogLayout>
  );
};

export default Posts;
