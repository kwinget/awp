import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import Img from "gatsby-image"
// import Image from "../components/slices/ImageSlice"
// import Text from "../components/slices/TextSlice"
// import Quote from "../components/slices/QuoteSlice"
// import Video from "../components/slices/VideoSlice"
// import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import BackgroundImage from "gatsby-background-image"
import loadable from "@loadable/component"
import leaves from "../images/bloglogo.png"
import facebookIcon from "../images/facebook.png"
import linkedinIcon from "../images/linkedin.png"
import twitterIcon from "../images/twitter.png"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share"

// Sort and display the different slice options
const PostSlices = ({ slices, id }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.slice_type) {
        case "text":
          const Text = loadable(() => import(`../components/slices/TextSlice`))
          return (
            <div key={index} className="slice-wrapper slice-text">
              {<Text slice={slice} />}
            </div>
          )

        case "quote":
          const Quote = loadable(() =>
            import(`../components/slices/QuoteSlice`)
          )
          return (
            <div key={index} className="slice-wrapper slice-quote">
              {<Quote slice={slice} />}
            </div>
          )

        case "image":
          const Image = loadable(() =>
            import(`../components/slices/ImageSlice`)
          )
          return (
            <div key={index} className="slice-wrapper slice-image">
              {<Image slice={slice} />}
            </div>
          )
        case "video":
          const Video = loadable(() =>
            import(`../components/slices/VideoSlice`)
          )
          return (
            <div key={index} className="slice-wrapper slice-video">
              {<Video slice={slice} />}
            </div>
          )
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

const PageStyle = styled.div`
  max-width: 880px;
  margin: 0 auto;
  position: relative;
  top: 200px;
  padding-bottom: ${variable.sectionPadding};
  .blog-post-container {
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .main-image {
      margin-bottom: 40px;
      img {
        border-radius: 10px;
      }
    }
    .image-slice {
      img {
        border-radius: 10px;
      }
    }
  }
  h1 {
    margin-top: 0px;
    font-size: 30px;
    line-height: 37px;
    margin-bottom: 40px;
    font-weight: 500;
  }
  h2 {
    margin-bottom: 0px;
    font-size: 23px;
    line-height: 32px;
    font-weight: 500;
    strong {
      font-weight: 500;
    }
  }
  p {
    font-size: 17px;
    line-height: 27px;
    font-weight: 300;
    margin: 25px 0px;
  }
  img {
    border-radius: 4px;
    overflow: hidden;
  }
  .release-date {
    margin-bottom: 10px;
    font-weight: 300;
    font-size: 17px;
  }
  .blog-author {
    font-weight: 700;
    font-size: 18px;
  }
  svg {
    margin-right: 7px;
    font-size: 20px;
  }
  .image-slice {
    > div {
      padding: 0px !important;
    }
    img {
      width: auto !important;
      position: relative !important;
    }
  }
  .blog-line {
    width: 52px;
    height: 5px;
    background-color: ${variable.green};
    margin-bottom: 40px;
  }
  .two-leaves {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 240px;
    img {
      width: 86px;
      height: auto;
    }
  }
  .date-share {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    .blue-share {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 135px;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
      }
      .blue-share-text {
        font-size: 17px;
        font-weight: 300;
      }
    }
  }
`

const BlogHeader = styled.div`
  position: absolute;
  width: 100%;
  .blog-header-container {
    min-height: 350px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    .blog-post-image-title {
      color: white;
      font-family: "Libre Franklin";
      font-weight: 800;
      font-size: 54px;
      line-height: 72px;
      margin-bottom: 20px;
    }
  }
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
`

const Post = props => {
  // const prismicContent = props.data.prismic.allBlog_posts.edges[0]
  // if (!prismicContent) return null
  const node = props.data.page.data
  const site = props.data.site
  const defaultBlock = props.data.defaultBlock.data
  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node
  const shareUrl =
    "https://bluemountainbest.netlify.app/blog/" + props.data.page.uid
  return (
    <Layout>
      <SEO site={site} page={props.data.page}></SEO>

      <BlogHeader>
        <BackgroundImage fluid={props.data.blogbg.childImageSharp.fluid}>
          <Container>
            <div className="blog-header-container"></div>
          </Container>
        </BackgroundImage>
      </BlogHeader>
      <PageStyle>
        <Container>
          <div className="blog-post-container">
            <div className="blog-post-main">
              <div className="main-image">
                {node.main_image.localFile && (
                  <Img
                    fluid={node.main_image.localFile.childImageSharp.fluid}
                  />
                )}
              </div>
              <div className="date-share">
                {node.release_date && (
                  <div className="release-date">{node.release_date}</div>
                )}
                <div className="blue-share">
                  <div className="blue-share-text">Share:</div>
                  <FacebookShareButton url={shareUrl}>
                    <img src={facebookIcon} />
                  </FacebookShareButton>
                  <LinkedinShareButton url={shareUrl}>
                    <img src={linkedinIcon} />
                  </LinkedinShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <img src={twitterIcon} />
                  </TwitterShareButton>
                </div>
              </div>
              <h1>{node.title.text}</h1>
              <div className="blog-line"></div>
              {node.body && <PostSlices slices={node.body} />}
              <div className="two-leaves">
                <img src={leaves} />
              </div>
            </div>
          </div>
        </Container>
      </PageStyle>
      <div className="post-footer">
        <PostSlices slices={defaultBlock.body} id={defaultBlock.body[0].id} />
      </div>
    </Layout>
  )
}

export default Post

export const postQuery = graphql`
  query PostBySlug($uid: String!) {
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
    blogbg: file(relativePath: { eq: "Pageheaderblog.png" }) {
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
    page: prismicBlogPost(uid: { eq: $uid }) {
      uid
      type
      data {
        title {
          text
        }
        author {
          text
        }
        meta_description
        meta_title
        donotindex
        release_date(formatString: "MMM D, Y")
        main_image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        body {
          ... on PrismicBlogPostBodyVideo {
            slice_type
            id
            primary {
              video_embed {
                embed_url
              }
            }
          }
          ... on PrismicBlogPostBodyImage {
            slice_type
            id
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on PrismicBlogPostBodyText {
            slice_type
            id
            primary {
              text {
                html
                raw
                text
              }
            }
          }
        }
      }
    }
  }
`
