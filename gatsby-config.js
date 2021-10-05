require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const linkResolver = require("./src/utils/linkResolver")

module.exports = {
  siteMetadata: {
    title: `MassiveT herapeutics`,
    description: `Description. Change me.`,
    author: `Alexander Fountain`,
    siteUrl: `https://www.massivetherapeutics.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "241104827685370",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.massivetherapeutics.com",
        sitemap: "https://www.massivetherapeutics.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return true
        },
        linkResolver: ({ node, key, value }) => doc => {
          // Your link resolver
          if (doc.type === "blog_post") {
            return "/blog/" + doc.uid
          }
          if (doc.type === "pa") {
            return "/" + doc.uid
          }
          // Homepage route fallback
          return "/"
        },
        // PrismJS highlighting for labels and slices
        repositoryName: `${process.env.GATSBY_PRISMIC_REPOSITORY_NAME}`,
        accessToken: `${process.env.API_KEY}`,
        schemas: {
          pa: require("./src/schemas/page.json"),
          blog_post: require("./src/schemas/blog_post.json"),
          site_information: require("./src/schemas/site_information.json"),
          blocks: require("./src/schemas/blocks.json"),
          pres: require("./src/schemas/pres.json"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-X7PBNKYV9Z", // Google Analytics / GA
        ],
      },
    },
    {
      resolve: "@slixites/gatsby-plugin-google-fonts",
      options: {
        fonts: [
          `Roboto\:300,400,500,700,900`, // you can also specify font weights and styles
        ],
        display: "swap",
        preconnect: true,
        attributes: {
          rel: "stylesheet preload prefetch",
          as: "style",
        },
      },
    },
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-preact`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
    "gatsby-plugin-loadable-components-ssr",
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: ["https://images.prismic.io"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: '@import "variables.scss"; @import "mixins.scss";',
        includePaths: ["src/components/scss"],
      },
    },
    `gatsby-plugin-netlify-headers`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Massive Therapeutics`,
        short_name: `Massive Therapeutics`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/fav.png`, // This path is relative to the root of the site.
      },
    },
    // {
    //   resolve: `gatsby-plugin-favicon`,
    //   options: {
    //     logo: "./src/images/fav.png",

    //     // WebApp Manifest Configuration
    //     appName: null, // Inferred with your package.json
    //     appDescription: null,
    //     developerName: null,
    //     developerURL: null,
    //     dir: "auto",
    //     lang: "en-US",
    //     background: "#fff",
    //     theme_color: "#fff",
    //     display: "standalone",
    //     orientation: "any",
    //     version: "1.0",

    //     icons: {
    //       android: true,
    //       appleIcon: true,
    //       appleStartup: true,
    //       coast: false,
    //       favicons: true,
    //       firefox: true,
    //       yandex: false,
    //       windows: false,
    //     },
    //   },
    // },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allPrismicPa {
              nodes {
                uid
                data {
                  donotindex
                }
              }
            }
            allPrismicBlogPost {
              nodes {
                uid
              }
            }
        }`,
        resolveSiteUrl: ({ site, allSitePage }) => {
          //Alternativly, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        serialize: ({ site, allPrismicPa, allPrismicBlogPost }) => {
          let pages = []
          allPrismicPa.nodes.map(edge => {
            if (edge.data.donotindex != true) {
              if (edge.uid != "home") {
                pages.push({
                  url: `${site.siteMetadata.siteUrl}/${edge.uid}`,
                  changefreq: `daily`,
                  priority: 0.7,
                })
              }
            }
          })
          allPrismicBlogPost.nodes.map(edge => {
            pages.push({
              url: `${site.siteMetadata.siteUrl}/blog/${edge.uid}`,
              changefreq: `daily`,
              priority: 0.7,
            })
          })
          return pages
        },
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
}
