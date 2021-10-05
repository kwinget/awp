import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { RichText } from "prismic-reactjs"
import linkResolver from "../../utils/linkResolver"
import prismicHtmlSerializer from "../../gatsby/htmlSerializer"
import Img from "gatsby-image"
import "animate.css/animate.min.css"
import ScrollAnimation from "react-animate-on-scroll"
import * as variable from "../variables"

const LeftRightStyle = styled.div`
> div{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  align-items:center;
  p{
    margin:11px 0px;
  }
  @media (max-width: ${variable.mobileWidth}) {
    flex-direction:column;
  }
  .left{
    width:calc(50% - 30px);
    @media (max-width: ${variable.mobileWidth}) {
      width:100% !important;
      .left-shadow{
        display:none !important;
      }
      .right-shadow{
        display:none !important;
      }
      .gatsby-image-wrapper{
        left:unset !important;
        right:unset !important;
      }
    }
  }
  .right{
    width:calc(50% - 30px);
    @media (max-width: ${variable.mobileWidth}) {
      width:100% !important;
      .left-shadow{
        display:none !important;
      }
      .right-shadow{
        display:none !important;
      }
      .gatsby-image-wrapper{
        left:unset !important;
        right:unset !important;
      }
    }
  }
}
.right-title{
  display:flex;
  align-items:center;
  h2{
    margin:0px;
  }
  @media (max-width: ${variable.mobileWidth}) {
    margin-top:20px;
    h2{
      margin:0px;
    }
  }
}
.left-title{
  display:flex;
  align-items:center;
  h2{
    margin:0px;
  }
  @media (max-width: ${variable.mobileWidth}) {
    margin-top:20px;
    h2{
      margin:0px;
    }
  }
}
.left-icon{
  border-radius:10px;
  margin-right:10px;
}
.right-icon{
  border-radius:10px;
  margin-right:10px;
}
`

export const AnimateLeftRight = ({ slice }) => {
  console.log(slice)
  return (
    <LeftRightStyle>
      <Container>
        <div className="left">
          {slice.primary.left_title.text && (
            <div className="left-title">
              {slice.primary.left_icon.localFile && (
                <Img className="left-icon" fixed={slice.primary.left_icon.localFile.childImageSharp.fixed} />
              )}

              <h2>{slice.primary.left_title.text}</h2>
            </div>
          )}
          {slice.primary.left_copy && (
            <div className="left-copy">
              <RichText
                render={slice.primary.left_copy.raw}
                linkResolver={linkResolver}
                htmlSerializer={prismicHtmlSerializer}
              />
            </div>
          )
          }
          {slice.primary.left_image.localFile && (
            <div className="left-image">
              <ScrollAnimation
                animateIn="animate__slideInLeft"
                animateOnce={false}
              >
                <div className="left-shadow"></div>
              </ScrollAnimation>

              <div className="left-image-inner">
                <Img fluid={slice.primary.left_image.localFile.childImageSharp.fluid} />
              </div>
            </div>
          )
          }
        </div>
        <div className="right">
          {slice.primary.right_title.text && (
            <div className="right-title">
              {slice.primary.right_icon.localFile && (
                <Img className="right-icon" fixed={slice.primary.right_icon.localFile.childImageSharp.fixed} />
              )}
              <h2>{slice.primary.right_title.text}</h2>
            </div>
          )}
          {slice.primary.right_copy && (

            <div className="right-copy">
              <RichText
                render={slice.primary.right_copy.raw}
                linkResolver={linkResolver}
                htmlSerializer={prismicHtmlSerializer}
              />
            </div>
          )
          }
          {slice.primary.right_image.localFile && (
            <div className="right-image">
              <ScrollAnimation
                animateIn="animate__slideInRight"
                animateOnce={false}
              >
                <div className="right-shadow"></div>
              </ScrollAnimation>
              <div className="right-image-inner">
                <Img fluid={slice.primary.right_image.localFile.childImageSharp.fluid} />
              </div>
            </div>
          )
          }
        </div>
      </Container>
    </LeftRightStyle>
  )
}

export default AnimateLeftRight
