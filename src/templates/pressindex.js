import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import BackgroundImage from "gatsby-background-image"
import PressTeaser from "../components/entities/press/PressTeaser"
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
      width: calc((100%) / 2 - 190px);
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
      border: 2px solid ${variable.blue};
      color: ${variable.blue};
      &:first-child {
        margin-left: 0px;
      }
      &:hover {
        background: darken($dark-blue, 10%);
      }
      &[aria-current] {
        background-color: ${variable.blue};
        color: white;
      }
    }
  }
`

const InsightsHeader = styled.div`
  position: relative;
  &:after{
    content: '';
    height:40px;
    width:40px;
    border-radius:50%;
    background-color:white;
    position:absolute;
    bottom:-20px;
    right: calc(50% - 20px);
  }
  section {
    padding: 0px !important;
  }
  .hero-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    color:white;
    max-width:555px;
    margin:0 auto;
    text-align:center;
    p{
      font-size:18px;
      line-height:22px;
    }
  }
  h1 {
    font-weight: 800;
    font-size: 60px;
    line-height: 57px;
    color: #ffffff !important;
    margin-bottom:20px;
  }
  .hero-flex {
    min-height: 350px;
  }
`

// Sort and display the different slice options
const EntityResult = ({ blog }) => {
  console.log(blog)
  return blog.nodes.map((post, index) => (
    <PressTeaser post={post} key={index}></PressTeaser>
  ))
}

// Sort and display the different slice options
const PostSlices = ({ slices, id }) => {
  return slices.map((slice, index) => {
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
  console.log(props)
  const defaultBlock = props.data.defaultBlock.data

  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node
  const { currentPage, numPressPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPressPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  console.log(props)
  return (
    <Layout>
      <InsightsHeader>
        <BackgroundImage fluid={props.data.blogbg.childImageSharp.fluid}>
          <Container className="hero-slice-container">
            <div className="hero-flex" style={{ minHeight: min_height }}>
              <h1>Press Features & Releases</h1>
              <p>Features in news and business publications, as well as the latest press releases for Alternative Wealth Partners.</p>
            </div>
          </Container>
        </BackgroundImage>
      </InsightsHeader>
      <InsightsStyle>
        <Container className="blog-index-container">
          <EntityResult blog={props.data.press} />
        </Container>
        <Container className="pager">
          <div className="pager-previous-container">
            {!isFirst && (
              <Link to={"/press" + prevPage} rel="prev">
                Prev
              </Link>
            )}
          </div>

          <div className="pager-container">
            {Array.from({ length: numPressPages }, (_, i) => (
              <Link
                className="pager-link"
                key={`pagination-number${i + 1}`}
                to={`/press${i === 0 ? "" : "/" + (i + 1)}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
          <div className="pager-next-container">
            {!isLast && (
              <Link to={"/press" + nextPage} rel="next">
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
  query pressListQuery($skip: Int!, $limit: Int!) {
    press: allPrismicPres(limit: $limit, skip: $skip) {
      nodes {
        uid
        data {
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
