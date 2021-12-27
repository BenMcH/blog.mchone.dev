export type BlogPostAttributes = {
	meta: {
		title: string
	}
	author: string
	date: string
	hero: string
}

export type FrontMatterBlogPost = {
	attributes: BlogPostAttributes
	body: string
}
