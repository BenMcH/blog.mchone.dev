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
