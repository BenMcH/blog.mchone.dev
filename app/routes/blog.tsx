import {useState, useEffect} from 'react';
import { Link, Outlet } from "remix";

export default function BlogTemplate() {
    const [link, setLink] = useState('');

    const doc = typeof document === 'undefined' ? null : document || null;

    useEffect(() => {
        setLink(doc ? doc.location.toString() : '');
    }, [doc]);

	return (
		<div>
			<Link to="/">Back Home</Link>
			<Outlet />

			<p>
				Like this blog post?
				<a href={`https://twitter.com/intent/tweet?text=Check out this blog post by @mchonedev that I just read! ${link}`}>
						Share it on twitter!
				</a>
			</p>
		</div>
	)
}
