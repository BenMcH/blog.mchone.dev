import { HeadersFunction, json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { MDXPage } from "~/components/MdxComponent";
import { BlogPostAttributes } from "~/utils/blog-post-types";
import { get } from "~/utils/cache.server";
import { getLocalContent } from "~/utils/fs.server";
import { downloadMdxFileOrDirectory } from "~/utils/github.server";
import { compileMdx } from "~/utils/mdx.server";

type LoaderData = {
	post: {
		code: string
		frontmatter: BlogPostAttributes
	}
}

export const loader: LoaderFunction = async ({params}) => {
	const postTitle = params.post;

	invariant(postTitle, "BlogPost: postTitle is required");

	const getPost = async () => {
		if (process.env.NODE_ENV === 'production') {
			return get(`blog/${postTitle}`, async () => {
				const files = await downloadMdxFileOrDirectory(postTitle).then((post) => post.files);

				return compileMdx(postTitle, files);
			});
		} 

		const files = await getLocalContent(`${postTitle}`);

		return compileMdx(postTitle, files);
	}

	let post = await getPost();

	return json({post}, {
		headers: {
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
		}
	})
}

export const headers: HeadersFunction = ({loaderHeaders}) => {
	return {
		'Cache-Control': loaderHeaders.get('Cache-Control')!
	}
}

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
	return {
		'og:title': data.post.frontmatter.meta.title,

		'og:description': data.post.frontmatter.meta['description'],
		'og:image': `https://blog.mchone.dev${data.post.frontmatter.meta['hero']}`,
		...data.post.frontmatter.meta
	}
}

export default function BlogPost() {
	const {post} = useLoaderData<LoaderData>();

	return (
		<MDXPage code={post.code} />
	)
}
