import fs from 'node:fs/promises'

export async function walk(path: string, callback: (path: string, stat: any) => Promise<void> | void): Promise<void> {
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

export async function readFile(path: string): Promise<string> {
	return await fs.readFile(path, 'utf8')
};

export type Author = {
  name: string
  bio: string
  avatar: string
  social: {
    twitter: string
    github: string
	linkedIn: string
  }	
}

export async function getAuthor(username: string): Promise<Author> {
	const file = await readFile(`./app/authors/${username}.json`);

	return JSON.parse(file);
}
