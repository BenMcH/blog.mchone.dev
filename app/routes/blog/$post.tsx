import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { MDXPage } from "~/components/MdxComponent";
import { BlogPostAttributes } from "~/utils/blog-post-types";
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

	const files = process.env.NODE_ENV === 'production' ?
	(await downloadMdxFileOrDirectory(postTitle)).files
	: await getLocalContent(`${postTitle}`);

	const post = await compileMdx(postTitle, files);

	return json({post})
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
