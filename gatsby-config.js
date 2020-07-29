module.exports = {
  siteMetadata: {
    title: `Blog | Ben McHone`,
    name: `Ben McHone`,
    siteUrl: `https://blog.mchone.dev`,
    description: `Welcome to my blog! I am a developer with a love for Security, GraphQL and Javascript.`,
    hero: {
      heading: `Welcome to my blog, powered by GatsbyJS and hosted on Netlify!`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/ben_mch`,
      },
      {
        name: `github`,
        url: `https://github.com/benmch`,
      }
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};
