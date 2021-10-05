import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import BackgroundImage from "gatsby-background-image"
import BlogPostTeaser from "../components/entities/blog_post/BlogPostTeaser"
import loadable from "@loadable/component"
import "../components/scss/blocks/footer.scss"
const InsightsStyle = styled.div`
  padding: 75px 0px;
  .blog-index-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    article {
      margin-bottom: 40px;
      width: calc((100%) / 3 - 25px);
      margin-right: 20px;
      &:nth-child(3n + 3) {
        margin-right: 0px;
      }
      @media (max-width: ${variable.tabletWidth}) {
        width: calc((100%) / 2 - 10px);
        &:nth-child(3n + 3) {
          margin-right: 20px;
        }
        &:nth-child(2n + 2) {
          margin-right: 0px;
        }
      }
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        margin-right: 0px !important;
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
  .pager {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .pager-next-container {
      min-width: 50px;
      a {
        background-color: ${variable.blue};
        color: white;
        padding: 9px 15px;
        border-radius: 10px;
        font-size: 18px;
        margin-top: 20px;
        display: inline-block;
        &:hover {
          background: darken($dark-blue, 10%);
        }
      }
    }
    .pager-previous-container {
      min-width: 50px;
      a {
        background-color: ${variable.blue};
        color: white;
        padding: 9px 15px;
        border-radius: 10px;
        font-size: 18px;
        margin-top: 20px;
        display: inline-block;
        &:hover {
          background: darken($dark-blue, 10%);
        }
      }
    }
  }
  .pager-container {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      padding: 9px 15px;
      border-radius: 10px;
      font-size: 18px;
      margin-top: 20px;
      display: inline-block;
      margin-left: 10px;
      background-color: white;
      border: 2px solid ${variable.darkGreen};
      color: ${variable.darkGreen};
      &:first-child {
        margin-left: 0px;
      }
      &:hover {
        background: darken($dark-blue, 10%);
      }
      &[aria-current] {
        background-color: ${variable.darkGreen};
        color: white;
      }
    }
  }
`

const InsightsHeader = styled.div`
  position: relative;
  &:after {
    width: 100%;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    height: 100px;
    position: absolute;
    bottom: 0px;
    content: "";
  }
  section {
    padding: 0px !important;
  }
  .hero-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-weight: 800;
    font-size: 60px;
    line-height: 90px;
    color: #ffffff !important;
  }
  .hero-flex {
    min-height: 350px;
  }
`

// Sort and display the different slice options
const EntityResult = ({ blog }) => {
  console.log(blog)
  return blog.nodes.map((post, index) => (
    <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
  ))
}

// Sort and display the different slice options
const PostSlices = ({ slices, id }) => {
  return slices.map((slice, index) => {
    console.log(slice)
    const res = (() => {
      switch (slice.slice_type) {
        case "basic_section":
          const BasicSectionSlice = loadable(() =>
            import(`../components/slices/BasicSectionSlice`)
          )
          return (
            <div
              id={"slice-id-" + slice.primary.slice_id.text}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSlice slice={slice} />}
            </div>
          )
        case "columns_section":
          const ColumnSectionSlice = loadable(() =>
            import(`../components/slices/ColumnsSectionSlice`)
          )
          return (
            <div
              id={"slice-id-" + slice.primary.slice_id.text}
              key={index}
              className="slice-wrapper slice-columns"
            >
              {<ColumnSectionSlice slice={slice} />}
            </div>
          )
        default:
          return
      }
    })()
    return res
  })
}

const Post = props => {
  // const prismicContent = props.data.prismic.allBlog_posts.edges[0]
  // if (!prismicContent) return null
  // const node = props.data.page.data
  // const site = props.data.site
  var min_height = 350
  const defaultBlock = props.data.defaultBlock.data

  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <InsightsHeader>
        <BackgroundImage fluid={props.data.blogbg.childImageSharp.fluid}>
          <Container className="hero-slice-container">
            <div className="hero-flex" style={{ minHeight: min_height }}>
              <h1>Insights</h1>
            </div>
          </Container>
        </BackgroundImage>
      </InsightsHeader>
      <InsightsStyle>
        <Container className="blog-index-container">
          <EntityResult blog={props.data.blog} />
        </Container>
        <Container className="pager">
          <div className="pager-previous-container">
            {!isFirst && (
              <Link to={"/insights" + prevPage} rel="prev">
                Prev
              </Link>
            )}
          </div>

          <div className="pager-container">
            {Array.from({ length: numPages }, (_, i) => (
              <Link
                className="pager-link"
                key={`pagination-number${i + 1}`}
                to={`/insights${i === 0 ? "" : "/" + (i + 1)}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
          <div className="pager-next-container">
            {!isLast && (
              <Link to={"/insights/" + nextPage} rel="next">
                Next
              </Link>
            )}
          </div>
        </Container>
      </InsightsStyle>
      <div className="blog-post-right">
        <PostSlices slices={defaultBlock.body} id={defaultBlock.body[0].id} />
      </div>
    </Layout>
  )
}

export default Post

export const postQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    blog: allPrismicBlogPost(
      sort: { order: DESC, fields: data___release_date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        uid
        data {
          release_date(formatString: "MMM D Y")
          teaser {
            html
          }
          author {
            text
          }
          title {
            text
          }
          main_image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 475) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    blogbg: file(relativePath: { eq: "Pageheader.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          description {
            text
          }
          site_url {
            text
          }
          site_title {
            text
          }
          twitter_author {
            text
          }
        }
      }
    }
    defaultBlock: prismicBlocks(uid: { eq: "global-contact" }) {
      data {
        body {
          ... on PrismicBlocksBodyColumnsSection {
            id
            slice_type
            primary {
              background_color
              slice_id {
                text
              }
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              column_count
              font_color
              h1_title
              section_title {
                text
              }
            }
            items {
              content {
                raw
              }
            }
          }
          ... on PrismicBlocksBodyBasicSection {
            id
            slice_type
            primary {
              slice_id {
                text
              }
              background_color
              background_image {
                localFile {
                  mobilesmall: childImageSharp {
                    fluid(quality: 90, maxWidth: 360) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                  mobile: childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                  desktop: childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              background_video {
                url
              }
              content {
                html
                raw
              }
              font_color
              h1_title
              section_title {
                text
              }
              youtube_background {
                embed_url
              }
            }
          }
        }
      }
    }
  }
`
