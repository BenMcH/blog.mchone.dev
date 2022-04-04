import { blogPostCache } from "./blog-cache.server";

function getPosts() {
	return blogPostCache;
}

export {
	getPosts
};
