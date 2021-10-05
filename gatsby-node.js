const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      blog: allPrismicBlogPost {
        nodes {
          uid
        }
      }
      press: allPrismicPres {
        nodes {
          uid
        }
      }
      page: allPrismicPa {
        nodes {
          uid
        }
      }
    }
  `)
  const postsPerPage = 6
  const numPages = Math.ceil(pages.data.blog.nodes.length / postsPerPage)
  const insightsTemplate = path.resolve("src/templates/insights.js")
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/insights` : `/insights/${i + 1}`,
      component: insightsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  const postTemplate = path.resolve("src/templates/post.js")
  pages.data.blog.nodes.forEach(node => {
    createPage({
      path: `/blog/${node.uid}`,
      component: postTemplate,
      context: {
        uid: node.uid,
      },
    })
  })
  const pressPerPage = 6
  const numPressPages = Math.ceil(pages.data.press.nodes.length / pressPerPage)
  const pressIndexTemplate = path.resolve("src/templates/pressindex.js")
  Array.from({ length: numPressPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/press` : `/press/${i + 1}`,
      component: pressIndexTemplate,
      context: {
        limit: pressPerPage,
        skip: i * pressPerPage,
        numPressPages,
        currentPage: i + 1,
      },
    })
  })
  const pressTemplate = path.resolve("src/templates/press.js")
  pages.data.press.nodes.forEach(node => {
    createPage({
      path: `/press/${node.uid}`,
      component: pressTemplate,
      context: {
        uid: node.uid,
      },
    })
  })
  const pageTemplate = path.resolve("src/templates/page.js")
  pages.data.page.nodes.forEach(node => {
    if (node.uid == "home") {
      createPage({
        path: `/`,
        component: pageTemplate,
        context: {
          uid: node.uid,
        },
      })
    } else {
      createPage({
        path: `/${node.uid}`,
        component: pageTemplate,
        context: {
          uid: node.uid,
        },
      })
    }
  })
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}
