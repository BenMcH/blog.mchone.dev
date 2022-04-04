export type BlogPostAttributes = {
	meta: {
		[key: string]: string
	}
	headers: {
		[key: string]: string
	}
	author: string
	authorName: string
	date: string
	hero: string
	excerpt: string
}

export type FrontMatterBlogPost = {
	attributes: BlogPostAttributes
	body: string
}
