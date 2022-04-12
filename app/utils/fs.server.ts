import fs from 'fs/promises';
import { GitHubFile } from './mdx.server';

const contentPath = 'content'

export const getLocalContent = async (path: string): Promise<Array<GitHubFile>> => {
	const results = await fs.readdir(`${contentPath}/${path}`);

	const files: Array<GitHubFile> = await Promise.all(results.map(async (fileOrDirectory) => {
		const data = await fs.readFile(`${contentPath}/${path}/${fileOrDirectory}`, 'utf-8');

		return {
			path: `${path}/${fileOrDirectory}`,
			content: data.toString(),
		}
	}));

	return files;
}
