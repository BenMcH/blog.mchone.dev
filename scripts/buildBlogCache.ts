import fm from "front-matter";
import { BlogPostAttributes } from "../app/utils/blog-post-types";
import author from '../app/authors/ben-mchone.json';
import fs from 'fs/promises'
import { watch } from 'fs';

type BlogPost = {
	attributes: BlogPostAttributes
	body: string
	url: string
	authorName: string
}

async function walk(path: string, callback: (path: string, stat: any) => Promise<void> | void): Promise<void> {
	const results = await fs.readdir(path)

	await Promise.all(results.map(async (fileOrDirectory) => {
		const filePath = `${path}/${fileOrDirectory}`
		const stat = await fs.stat(filePath)

		if (stat.isDirectory()) {
			return walk(filePath, callback)
		} else {
			return callback(filePath, stat)
		}
	}));
};

async function getPosts() {
	let walkPath = './app/routes';

	let blogPosts: Array<BlogPost> = [];

	let addFile = async (file: string) => {
		if (file.endsWith('.md')) {
			let frontmatter = fm<BlogPostAttributes>(await fs.readFile(file, 'utf-8'));

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

	await fs.writeFile('./app/utils/blog-cache.server.ts', `
import { BlogPostAttributes } from "~/utils/blog-post-types"

export type BlogPost = {
	attributes: BlogPostAttributes
	body: string
	url: string
	authorName: string
}

export const blogPostCache: Array<BlogPost> = ${JSON.stringify(blogPosts)}

	`);
}

getPosts();

if (process.argv.at(-1) === 'watch') {
	watch('./app/routes/blog/', (eventType, filename) => {
		if (filename.endsWith('.md')) {
			getPosts();
		}
	});
}
