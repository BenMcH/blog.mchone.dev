import {useState, useEffect} from 'react';
import { Outlet } from "remix";

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
