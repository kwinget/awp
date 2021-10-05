import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { RichText } from "prismic-reactjs"
import * as variable from "../variables"
import linkResolver from "../../utils/linkResolver"
import prismicHtmlSerializer from "../../gatsby/htmlSerializer"
import "animate.css/animate.min.css"
import ScrollAnimation from "react-animate-on-scroll"
const ColumnStyle = styled.div`
  .column {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      max-width: 100%;
    }
    .column-item {
      border-radius: 4px;
      position:relative;
    }
  }
  .column-count-2 {
    .column-item {
      width: calc(100% / 2 - 10px);
      overflow: hidden;
    }
  }
  .column-count-3 {
    .column-item {
      width: calc(100% / 3 - 10px);
    }
  }
  .column-count-4 {
    .column-item {
      width: calc(100% / 4 - 10px);
    }
  }
  .column-count-5 {
    .column-item {
      width: calc(100% / 5 - 10px);
    }
  }
  .column-count-6 {
    .column-item {
      width: calc(100% / 6 - 10px);
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .column-item {
      width: calc(100% / 2 - 10px) !important;
      margin-bottom: 20px;
    }
  }
  @media (max-width: ${variable.mobileWidthSmall}) {
    .column-item {
      width: 100% !important;
      margin-bottom: 20px;
    }
  }
  .animated{
    z-index:2;
    position:relative;
  }
  p{
    z-index:3;
    position:relative;
  }
  .column-shadow{
    background-color: rgba(35, 164, 85, 0.50);
    position:absolute;
    height:200px;
    top:-30px;
    width:100%;
    animation: slideInDown; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s; /* don't forget to set a duration! */
  }
`

function ColumnsSectionSlice({ slice }) {
  const shouldShowActions = false
  var fluid = null
  var bgColor = null
  var columnCount = null
  var items = null
  if (slice.primary.background_image.localFile != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }
  if (slice.primary.background_color != null) {
    bgColor = slice.primary.background_color
  }
  if (slice.primary.column_count != null) {
    columnCount = slice.primary.column_count
  }
  if (slice.items != null) {
    items = slice.items
  }

  // items = slice.items
  return (
    <div>
      {fluid && (
        <BackgroundImage Tag="section" fluid={fluid}>
          <ColumnStyle>
            <Container>
              <section>
                {slice.primary.section_title.text && (
                  <h2>{slice.primary.section_title.text}</h2>
                )}
                <div className={"column column-count-" + columnCount}>
                  {items &&
                    items.map((item, index) => (
                      <div key={index} className="column-item">
                        <div className="column-item-inner">
                          <RichText
                            render={item.content.raw}
                            linkResolver={linkResolver}
                            htmlSerializer={prismicHtmlSerializer}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </Container>
          </ColumnStyle>
        </BackgroundImage>
      )}
      {!fluid && (
        <ColumnStyle
          style={{ backgroundColor: slice.primary.background_color }}
        >
          <Container>
            <section>
              <div className={"column column-count-" + columnCount}>
                {items &&
                  items.map((item, index) => (
                    <div key={index} className="column-item">
                      <div className="column-item-inner">
                        <ScrollAnimation
                          animateIn="animate__fadeInDownBig"
                          animateOnce={false}
                        >
                          <div className="column-shadow"></div>
                        </ScrollAnimation>
                        <RichText
                          render={item.content.raw}
                          linkResolver={linkResolver}
                          htmlSerializer={prismicHtmlSerializer}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </Container>
        </ColumnStyle>
      )}
    </div>
  )
}

export default ColumnsSectionSlice
