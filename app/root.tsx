import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "remix";
import type { MetaFunction } from "remix";
import { Author, getAuthor } from "./utils/fs.server";

export const meta: MetaFunction = () => {
  return { title: "Ben McHone's Blog" };
};

export async function loader() {
	return {
		author: await getAuthor('ben-mchone')
	}
}

export default function App() {
  const data = useLoaderData<{ author: Author }>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link href={'/global.css'} rel="stylesheet" />
      </head>
      <body>
        <header>
          <Link to="/">Ben McHone's Blog</Link>
        </header>
        <main>
          <Outlet />
          <section className="author">
            <h2>About the Author</h2>
            <div className="details">
              <span>
                <img src={data.author.avatar} alt={data.author.name} />
              </span>
              <p>A tech enthusiast with a love for Software Engineering and DevOps. I have comfort in all levels of the stack and a love of teaching and elevating those around me. I am currently a Software consultant in Des Moines, Iowa. Interested in chatting? Connect with me on <a href={`https://www.linkedin.com/in/${data.author.social.linkedIn}/`}>LinkedIn</a> or reach out on <a href={`https://twitter.com/${data.author.social.twitter}`}>Twitter</a></p>
            </div>
          </section>
        </main>
        <footer>
          <p>
            <span className="copyright">&copy; 2021 {data.author.name}</span>
            <span className="github-link"><a href={`https://github.com/${data.author.social.github}`}>Github</a></span> | 
            <span className="twitter-link"><a href={`https://twitter.com/${data.author.social.twitter}`}>Twitter</a></span>
          </p>
        </footer>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
