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

  return new Response(JSON.stringify({
    blogPosts: files.sort((a, b) => b.url.localeCompare(a.url))
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=180, s-maxage=3600'
    }
  });
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
    <>
      <h1>Ben McHone</h1>
      <p>
        From Ruby to Javascript, REST to GraphQL, Kubernetes to lambda functions,
        I love all things tech. This blog is my collection of thoughts surrounding tech,
        life, and other hobbies. This blog is built upon <a href="https://remix.run">Remix</a> and
        other web fundamentals.
      </p>
      <ul className="blog-list">
        {data.blogPosts.slice(0, 10).map(post => (
          <li key={post.url}>
            <Link prefetch="intent" to={post.url}>
              <img
                alt={post.attributes.meta.title}
                src={post.attributes.hero}
                className="hero"
              />
            </Link>
            <Link prefetch="intent"  to={post.url}>
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
    </>
  );
}
