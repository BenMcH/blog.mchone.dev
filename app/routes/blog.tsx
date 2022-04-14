import { ErrorBoundaryComponent, json, LinksFunction, LoaderFunction, Outlet, useLoaderData, Link } from "remix";
import darkStyles from 'highlight.js/styles/base16/solarized-dark.css'
import lightStyles from 'highlight.js/styles/base16/solarized-light.css'

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: darkStyles, media: '(prefers-color-scheme: dark)'},
  {rel: "stylesheet", href: lightStyles, media: '(prefers-color-scheme: light)'},
]

export const loader: LoaderFunction = async ({request}) => {
	return json({
		url: request.url
	});
}

export default function BlogPost() {
    const {url} = useLoaderData();

	return (
		<article className="prose dark:prose-invert xl:prose-xl">
			<Outlet />
			<p>
				Like this blog post? <a href={`https://twitter.com/intent/tweet?text=Check out this blog post by @mchonedev that I just read! ${url}`}>Share it on twitter!</a>
			</p>
		</article>
	)
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
	if (error.message.includes('Not found')) {
		return (
			<>
				<h1>Blog post not found :(</h1>
				<Link to="/" className="underline underline-offset-2 text-2xl">Go home</Link>
			</>
		);
	}

	return <h1>Unexpected error</h1>
}
