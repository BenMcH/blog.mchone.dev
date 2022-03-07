import { Link, LoaderFunction, useLoaderData } from 'remix';
import { BlogPost, getPosts } from '~/utils/blog.server';

export function meta() {
  return { title: 'Ben McHone\'s Blog' };
}

export let loader: LoaderFunction = async function() {
  return new Response(JSON.stringify({
    blogPosts: await getPosts()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=180, s-maxage=3600'
    }
  });
}

type LoaderType = {
  blogPosts: BlogPost[]
};

export default function Index() {
  const data = useLoaderData<LoaderType>();

  return (
    <>
      <p className="mt-4">
        From Ruby to Javascript, REST to GraphQL, Kubernetes to lambda functions,
        I love all things tech. This blog is my collection of thoughts surrounding tech,
        life, and other hobbies. This blog is built upon <a href="https://remix.run">Remix</a> and
        other web fundamentals.
      </p>
      <ul className="flex md:flex-row md:flex-wrap list-none gap-5 mt-4 flex-col flex-nowrap items-stretch">
        {data.blogPosts.slice(0, 10).map(post => (
          <li key={post.url} className="md:max-w-sm p-5 border-gray-400 border-2 rounded-md flex-1 flex justify-between flex-col gap-5">
            <Link prefetch="intent" to={post.url}>
              <img
                alt={post.attributes.meta.title}
                src={post.attributes.hero}
                className="md:max-w-xs max-w-full"
              />
            </Link>
            <Link prefetch="intent"  to={post.url} className="text-2xl">
              {post.attributes.meta.title}
            </Link>

            <blockquote className="border-l-2 pl-5">
              {post.attributes.excerpt}
            </blockquote>

            <p className="text-sm">
              {new Date(post.attributes.date).toLocaleDateString()} - {post.authorName}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
