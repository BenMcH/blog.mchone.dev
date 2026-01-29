module.exports = eleventyConfig => {
	eleventyConfig.addPassthroughCopy({ './src/public': "/" });

	eleventyConfig.addFilter("postDate", (dateObj) => {
		return new Date(dateObj).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
	});

	eleventyConfig.addFilter("addVersion", function(content, version) {
		if (!content || !version) return content;
		return content.replace(/(<img[^>]+src=["'])([^"'?]+)(["'])/gi, `$1$2?v=${version}$3`);
	});

	return { 
		dir: {
			input: './src'
		}
	}
};
