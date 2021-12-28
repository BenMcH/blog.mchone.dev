import fm from 'front-matter';
import { walk, readFile, getAuthor } from "~/utils/fs.server";
import type { BlogPostAttributes } from "~/utils/blog-post-types";

import { Link, LoaderFunction, useLoaderData } from 'remix';

export function meta() {
  return { title: 'Ben McHone\'s Blog' };
}

export let loader: LoaderFunction = async function() {
  let files: BlogPost[] = [];

  let walkPath = './app/routes';

  const author = await getAuthor('ben-mchone');

  let addFile = async (file: string) => {
    if (file.endsWith('.md')) {
      let frontmatter = fm<BlogPostAttributes>(await readFile(file));

      files.push({
        attributes: frontmatter.attributes,
        body: frontmatter.attributes.excerpt.substring(0, 100) + '...',
        url: file.substring(walkPath.length + 1, file.length - 3),
        authorName: author.name
      });
    }
  }

  await walk(walkPath, addFile);

  return {
    blogPosts: files.sort((a, b) => b.url.localeCompare(a.url))
  }
}

type BlogPost = {
  attributes: BlogPostAttributes
  body: string
  url: string
  authorName: string
}

type LoaderType = {
  blogPosts: BlogPost[]
};

export default function Index() {
  const data = useLoaderData<LoaderType>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to My Blog</h1>
      <ul className="blog-list">
        {data.blogPosts.slice(0, 10).map(post => (
          <li key={post.url}>
            <Link to={post.url}>
              <img
                alt={post.attributes.meta.title}
                src={post.attributes.hero}
                className="hero"
              />
            </Link>
            <Link to={post.url}>
              {post.attributes.meta.title}
            </Link>

            <blockquote>
              {post.attributes.excerpt}
            </blockquote>

            <p style={{ fontSize: "0.8rem" }}>
              {new Date(post.attributes.date).toLocaleDateString()} - {post.authorName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
