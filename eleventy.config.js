module.exports = eleventyConfig => {
	eleventyConfig.addPassthroughCopy({ './src/public': "/" });

	eleventyConfig.addFilter("postDate", (dateObj) => {
		return new Date(dateObj).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
	});

	return { 
		dir: {
			input: './src'
		}
	}
};
