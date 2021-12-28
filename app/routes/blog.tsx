import {useState, useEffect} from 'react';
import { Outlet, useLoaderData } from "remix";
import { Author, getAuthor } from '~/utils/fs.server';

export async function loader() {
	console.log('loader');

	return {
		author: await getAuthor('ben-mchone')
	}
}

export default function BlogTemplate() {
    const [link, setLink] = useState('');

	const data = useLoaderData<{author: Author}>()
    const doc = typeof document === 'undefined' ? null : document || null;

    useEffect(() => {
        setLink(doc ? doc.location.toString() : '');
    }, [doc]);

	return (
		<article className="blog-post">
			<Outlet />
			<p>
				Like this blog post?
				<a href={`https://twitter.com/intent/tweet?text=Check out this blog post by @mchonedev that I just read! ${link}`}>
						Share it on twitter!
				</a>
			</p>
		</article>
	)
}
