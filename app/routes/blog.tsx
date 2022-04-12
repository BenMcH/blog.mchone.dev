import {useState, useEffect} from 'react';
import { json, LinksFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
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
