import { BlogPost } from "./blog-post-types";
import { get } from "./cache.server";
import { getLocalFile } from "./fs.server";
import { downloadFile } from "./github.server";

export const getPosts = async (): Promise<BlogPost[]> => {
	if (process.env.NODE_ENV !== "production") {
		return JSON.parse(await getLocalFile('blog-cache.json'));
	}

	const data = await get<BlogPost[]>('blog-posts', async () => JSON.parse(await downloadFile('content/blog-cache.json')));

	return data || [];
}
