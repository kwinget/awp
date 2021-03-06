import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { Date } from "prismic-reactjs"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const BlogPostTeaserStyle = styled.article`
  padding: 15px;
  text-decoration: none;
  position: relative;
  .blog-teaser-title {
    display: block;
    h2 {
      font-size: 20px;
      line-height: 27px;
      font-weight: 400;
      margin: 35px 0px 0px 0px;
      color: ${variable.blue};
    }
  }
  p {
    font-size: 17px;
    line-height: 27px;
    font-weight: 300;
    margin-top: 10px;
  }
  .blog-teaser-image {
    margin-bottom: 20px;
  }
  .cta-button {
    font-size: 14px;
    color: ${variable.blue};
  }
  .blog-teaser-image-container {
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
    .gatsby-image-wrapper{

&:before{
  border-radius:5px;
}
&:after{
  border-radius:5px;
}
}
  }
  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    &:before {
      background-size: contain;
      border-radius: 10px;
    }
  }
`

function returnImage(post) {
  if (post.data.main_image.localFile != null) {
    if (post.data.main_image.localFile.childImageSharp) {
      return (
        <BackgroundImage
          Tag="section"
          fluid={post.data.main_image.localFile.childImageSharp.fluid}
        ></BackgroundImage>
      )
    }
  }
}
export const PressTeaser = ({ post }) => {
  return (
    <BlogPostTeaserStyle>
      <div className="blog-teaser-image-container">{returnImage(post)}</div>

      <Link className="blog-teaser-title" to={"/press/" + post.uid}>
        {post.data.title.text && <h2>{post.data.title.text}</h2>}
      </Link>
      {/* {post.data.release_date && (
        <div className="release-date">{formattedDate}</div>
      )}
      {post.data.author && (
        <div className="blog-author">{post.data.author.text}</div>
      )} */}
      {post.data.teaser && (
        <div
          className="blog-teaser"
          dangerouslySetInnerHTML={{ __html: post.data.teaser.html }}
        />
      )}
      <Link className="cta-button" to={"/press/" + post.uid}>
        Read more
      </Link>
    </BlogPostTeaserStyle>
  )
}

export default PressTeaser
