import {useState, useEffect} from 'react';
import { LinksFunction, Outlet } from "remix";
import darkStyles from 'highlight.js/styles/base16/solarized-dark.css'
import lightStyles from 'highlight.js/styles/base16/solarized-light.css'

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: darkStyles, media: '(prefers-color-scheme: dark)'},
  {rel: "stylesheet", href: lightStyles, media: '(prefers-color-scheme: light)'},
]

export default function BlogTemplate() {
    const [link, setLink] = useState('');

    const doc = typeof document === 'undefined' ? null : document || null;

    useEffect(() => {
        setLink(doc ? doc.location.toString() : '');
    }, [doc]);

	return (
		<article className="prose dark:prose-invert xl:prose-xl">
			<Outlet />
			<p>
				Like this blog post? <a href={`https://twitter.com/intent/tweet?text=Check out this blog post by @mchonedev that I just read! ${link}`}>Share it on twitter!</a>
			</p>
		</article>
	)
}
