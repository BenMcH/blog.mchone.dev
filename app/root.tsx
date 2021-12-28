import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
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
        </main>
        <footer>
          <p>
            <span className="copyright">&copy; 2021 Ben McHone</span>
            <span className="github-link"><a href={`https://github.com/benmch`}>Github</a></span> | 
            <span className="twitter-link"><a href={`https://twitter.com/mchonedev`}>Twitter</a></span>
          </p>
        </footer>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
