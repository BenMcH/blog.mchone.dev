import fm from "front-matter";
import { BlogPostAttributes } from "./blog-post-types";
import { getAuthor, readFile, walk } from "./fs.server";

export type BlogPost = {
	attributes: BlogPostAttributes
	body: string
	url: string
	authorName: string
}

let blogPosts: BlogPost[] = [];

async function populateBlogCache() {
	let walkPath = './app/routes';

	const author = await getAuthor('ben-mchone');

	let addFile = async (file: string) => {
		if (file.endsWith('.md')) {
			let frontmatter = fm<BlogPostAttributes>(await readFile(file));

			blogPosts.push({
				attributes: frontmatter.attributes,
				body: frontmatter.attributes.excerpt.substring(0, 100) + '...',
				url: file.substring(walkPath.length + 1, file.length - 3),
				authorName: author.name
			});
		}
	}

	await walk(walkPath, addFile);

	blogPosts = blogPosts.sort((a, b) => b.url.localeCompare(a.url))
}

let populatePromise = populateBlogCache();

async function getPosts() {
	await populatePromise;
	return blogPosts;
}

export {
	getPosts
};
