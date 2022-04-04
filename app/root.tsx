import {
  Link,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "remix";
import type { MetaFunction } from "remix";
import tailwind from '~/tailwind.css';

import author from '~/authors/ben-mchone.json';

export const meta: MetaFunction = () => {
  return { title: "Ben McHone's Blog" };
};

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: tailwind},
]

export async function loader() {
	return {
		author
	}
}

export default function App() {
  const data = useLoaderData<{ author: typeof author }>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3KRMPF');`}} />
      </head>
      <body className="flex flex-col">
        <header className="flex gap-5 text-3xl">
          <Link to="/">Ben McHone's Blog</Link>
        </header>
        <main className="flex-1">
          <Outlet />
          <section className="flex flex-col gap-1 mt-5">
            <h2>About the Author</h2>
            <div className="flex gap-5">
              <span>
                <img src={data.author.avatar} alt={data.author.name} className="w-100" />
              </span>
              <p>
                A tech enthusiast with a love for Software Engineering and DevOps.
                I have comfort in all levels of the stack and a love of teaching and
                elevating those around me. I am currently a Software consultant in Des Moines, Iowa.
                Interested in chatting? Connect with me on <a href={`https://www.linkedin.com/in/${data.author.social.linkedIn}/`} className="underline underline-offset-1">LinkedIn</a> or reach out on <a href={`https://twitter.com/${data.author.social.twitter}`} className="underline underline-offset-1">Twitter</a></p>
            </div>
          </section>
        </main>
        <footer className="mt-5">
          <p className="flex gap-3">
            <span className="flex-1">&copy; 2021 {data.author.name}</span>
            <a href={`https://github.com/${data.author.social.github}`}>Github</a> | 
            <a href={`https://twitter.com/${data.author.social.twitter}`}>Twitter</a>
          </p>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W3KRMPF" height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript>
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
