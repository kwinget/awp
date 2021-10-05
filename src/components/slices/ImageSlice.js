import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"

const ImageStyle = styled.div`
  max-width: 100%;
  img {
    max-width: 100%;
  }
`

export const ImageSlice = ({ slice }) => {
  return <Img fluid={slice.primary.image.localFile.childImageSharp.fluid} />
}

export default ImageSlice
