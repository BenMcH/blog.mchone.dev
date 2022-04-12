
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
  mdx: async (filename) => {
    const [rehypeHighlight, remarkToc, dockerfile] = await Promise.all([
      import("rehype-highlight").then((mod) => mod.default),
      import("remark-toc").then((mod) => mod.default),
      import('highlight.js/lib/languages/dockerfile').then((mod) => mod.default),
    ]);

    return {
      remarkPlugins: [remarkToc],
      rehypePlugins: [(options = {}) => rehypeHighlight({
        ...options,
        languages: {
          ...options.languages,
          dockerfile,
        }
      })],
    };
  }
};
