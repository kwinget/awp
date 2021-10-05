import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import "../components/scss/page/home.scss"
import "../components/scss/page/services.scss"
import "../components/scss/page/about.scss"
import SEO from "../components/seo"
import { ReactTypeformEmbed } from "react-typeform-embed"

import loadable from "@loadable/component"

// Sort and display the different slice options
const PostSlices = ({ slices, blog }) => {
  return slices.map((slice, index) => {
    var sliceID = ""
    if (slice.primary) {
      if (slice.primary.slice_id != undefined) {
        var sliceID = slice.primary.slice_id.text
      }
      if (slice.primary.id != undefined) {
        var sliceID = slice.primary.id.text
      }
    }
    const res = (() => {
      switch (slice.slice_type) {
        case "basic_section":
          const BasicSectionSlice = loadable(() =>
            import(`../components/slices/BasicSectionSlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSlice slice={slice} />}
            </div>
          )

        case "animate_left_right":
          const AnimateLeftRight = loadable(() =>
            import(`../components/slices/AnimateLeftRight`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-animate-left-right"
            >
              {<AnimateLeftRight slice={slice} />}
            </div>
          )

        case "hero":
          const HeroSlice = loadable(() =>
            import(`../components/slices/HeroSlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-hero"
            >
              {<HeroSlice slice={slice} />}
            </div>
          )

        case "contact":
          const ContactSlice = loadable(() =>
            import(`../components/slices/ContactSlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-contact"
            >
              {<ContactSlice slice={slice} />}
            </div>
          )

        case "block_reference":
          const BlockReferenceSlice = loadable(() =>
            import(`../components/slices/BlockReferenceSlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-block-reference"
            >
              {<BlockReferenceSlice slice={slice} />}
            </div>
          )

        case "entity_query":
          const EntityQuerySlice = loadable(() =>
            import(`../components/slices/EntityQuerySlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-entity-query"
            >
              {<EntityQuerySlice slice={slice} blog={blog} />}
            </div>
          )

        // case "slideshow":
        //   return (
        //     <div
        //       id={"slice-id-" + slice.id}
        //       key={index}
        //       className="slice-wrapper slice-slideshow"
        //     >
        //       {/* {<EntityQuerySlice slice={slice} blog={blog} />} */}
        //     </div>
        //   )

        case "columns_section":
          const ColumnSectionSlice = loadable(() =>
            import(`../components/slices/ColumnsSectionSlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-columns"
            >
              {<ColumnSectionSlice slice={slice} />}
            </div>
          )

        case "left_right_section":
          const LeftRightSlice = loadable(() =>
            import(`../components/slices/LeftRightSlice`)
          )
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<LeftRightSlice slice={slice} />}
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
  section {
    padding: ${variable.sectionPadding} 0px;
  }
`
const Page = ({ data }) => {
  const node = data.page
  const site = data.site
  const blog = data.blog
  return (
    <Layout slug={node.uid}>
      <SEO site={site} page={node} />
      <PageStyle style={{ minHeight: "800px" }}>
        {node.data.body && <PostSlices slices={node.data.body} blog={blog} />}
      </PageStyle>
    </Layout>
  )
}
export default Page

export const postQuery = graphql`
  query PageBySlug($uid: String!) {
    page: prismicPa(uid: { eq: $uid }) {
      uid
      id
      type
      data {
        meta_title
        meta_description
        donotindex
        title {
          text
        }
        body {
          ... on PrismicPaBodySlideshow {
            id
            primary {
              background_color
              section_title {
                text
              }
            }
            slice_type
            items {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              image_copy {
                html
              }
            }
          }
          ... on PrismicPaBodyAnimateLeftRight {
            id
            slice_type
            primary {
              id {
                text
              }
              left_copy {
                raw
              }
              left_icon {
                localFile {
                  childImageSharp {
                    fixed(width:41, height:41) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
              right_icon {
                localFile {
                  childImageSharp {
                    fixed(width:41, height:41) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
              left_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              left_title {
                text
              }
              right_copy {
                raw
              }
              right_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              right_title {
                text
              }
            }
          }
          ... on PrismicPaBodyBasicSection {
            id
            slice_type
            items {
              sidebar_block_reference {
                document {
                  ... on PrismicBlocks {
                    id
                    data {
                      block_title {
                        text
                      }
                      body {
                        ... on PrismicBlocksBodyBasicSection {
                          id
                          slice_type
                          primary {
                            background_color
                            background_video {
                              url
                            }
                            youtube_background {
                              embed_url
                            }
                            background_image {
                              localFile {
                                childImageSharp {
                                  fluid(maxWidth: 3840) {
                                    ...GatsbyImageSharpFluid
                                  }
                                }
                              }
                            }
                            content {
                              raw
                            }
                            font_color
                            h1_title
                            section_title {
                              text
                            }
                            slice_id {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            primary {
              section_title {
                text
              }
              h1_title
              font_color
              background_color
              slice_id {
                text
              }
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
                    fluid(quality: 100, maxWidth: 3840) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              background_video {
                url
              }
              youtube_background {
                embed_url
              }
              content {
                html
                raw
              }
            }
          }
          ... on PrismicPaBodyEntityQuery {
            id
            slice_type
            primary {
              entity_type
              number_of_entities
              slice_id {
                text
              }
              section_title {
                text
              }
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3840) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on PrismicPaBodyBlockReference {
            id
            primary {
              block_reference {
                document {
                  ... on PrismicBlocks {
                    id
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
                                  fluid(maxWidth: 3840) {
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
                                  fluid(quality: 100, maxWidth: 3840) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                  }
                                }
                              }
                            }
                            section_title {
                              text
                            }
                            h1_title
                            font_color
                            background_color
                            slice_id {
                              text
                            }
                            content {
                              raw
                            }
                          }
                          items {
                            sidebar_block_reference {
                              document {
                                ... on PrismicBlocks {
                                  id
                                  data {
                                    body {
                                      ... on PrismicBlocksBodyBasicSection {
                                        id
                                        slice_type
                                        primary {
                                          background_color
                                          background_video {
                                            url
                                          }
                                          youtube_background {
                                            embed_url
                                          }
                                          background_image {
                                            localFile {
                                              childImageSharp {
                                                fluid(maxWidth: 3840) {
                                                  ...GatsbyImageSharpFluid
                                                }
                                              }
                                            }
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
                                          slice_id {
                                            text
                                          }
                                        }
                                      }
                                    }
                                    block_title {
                                      text
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        ... on PrismicBlocksBodyLeftRightSection {
                          id
                          slice_type
                          primary {
                            active_campaign_form_number
                            embed {
                              raw
                            }
                            section_title {
                              text
                            }
                            left_background_image {
                              localFile {
                                childImageSharp {
                                  fluid(maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid
                                  }
                                }
                              }
                            }
                            left_content {
                              html
                              raw
                            }
                            right_background_image {
                              localFile {
                                childImageSharp {
                                  fluid(maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid
                                  }
                                }
                              }
                            }
                            right_content {
                              html
                              raw
                            }
                            right_embed {
                              raw
                            }
                            section_title {
                              text
                            }
                            slice_id {
                              text
                            }
                          }
                        }
                      }
                      block_title {
                        text
                      }
                    }
                  }
                }
              }
            }
            slice_type
          }
          ... on PrismicPaBodyHero {
            id
            slice_type
            primary {
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3840) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              font_color
              min_height
              hero_title {
                text
              }
            }
          }
          ... on PrismicPaBodyContact {
            id
            slice_type
          }
          ... on PrismicPaBodyColumnsSection {
            id
            slice_type
            primary {
              background_color
              column_count
              slice_id {
                text
              }
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3840) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              section_title {
                text
              }
              h1_title
              font_color
            }
            items {
              content {
                html
                raw
              }
            }
          }

          ... on PrismicPaBodyLeftRightSection {
            id
            slice_type
            primary {
              left_width
              right_width
              slice_id {
                text
              }
              section_title {
                text
              }
              embed {
                text
              }
              right_embed {
                text
              }
              active_campaign_form_number
              right_active_campaign_form_number
              right_content_above_form {
                raw
              }
              left_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              right_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              right_content {
                html
                raw
              }
              left_content {
                html
                raw
              }
            }
          }
        }
      }
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          meta_title {
            text
          }
          meta_description {
            text
          }
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
    blog: allPrismicBlogPost(
      sort: { order: DESC, fields: data___release_date }
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
  }
`
