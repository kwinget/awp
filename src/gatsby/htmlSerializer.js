import React from "react"
import { Link } from "gatsby"
import ResponsiveEmbed from "react-responsive-embed"

const linkResolver = (doc, content, linkClass) => {
  // Route for blog posts
  if (doc.type === "blog_post") {
    return (
      <Link to={"/blog/" + doc.uid} className={linkClass}>
        {content}
      </Link>
    )
  }
  if (doc.uid === "learn-how-to-protect-microsoft-365-data") {
    return (
      <Link to={"/webinars/" + doc.uid} className={linkClass}>
        {content}
      </Link>
    )
  }
  if (doc.type === "pa") {
    return (
      <Link to={"/" + doc.uid} className={linkClass}>
        {content}
      </Link>
    )
  }
  // Homepage route fallback
  return (
    <Link to={"/"} className={linkClass}>
      {content}
    </Link>
  )
}

const htmlSerializer = (type, element, content, children) => {
  var link = ""
  switch (type) {
    case "embed":
      var video_id = element.oembed.embed_url.split("v=")[1]
      var ampersandPosition = video_id.indexOf("&")
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition)
      }

      return (
        <div className="video-container">
          <ResponsiveEmbed
            src={"https://www.youtube.com/embed/" + video_id}
            allowFullScreen
          />
        </div>
      )
    case "hyperlink":
      if (element.data.link_type == "Document") {
        if (children[0].props != null) {
          var linkClass = children[0].props.className
          if (children[0].props.className != undefined) {
          } else {
            var linkClass = ""
          }
        }
        link = linkResolver(element.data, content, linkClass)
      }
      return link
    case "image":
      const width = element.dimensions.width ? element.dimensions.width : ""
      const height = element.dimensions.height ? element.dimensions.height : ""
      const alt = element.alt ? element.alt : ""
      console.log(element)
      if (element.url && element.linkTo) {
        return (
          <p className="block-img">
            <a href={element.linkTo.url}>
              <img src={element.url} width={width} height={height} alt={alt} />
            </a>
          </p>
        )
      }
      if (element.url && !element.linkTo) {
        return (
          <p className="block-img">
            <img src={element.url} width={width} height={height} alt={alt} />
          </p>
        )
      } else {
        return ""
      }
    // First differentiate between a label and a preformatted field (e.g. the Code Block slice)
    default: {
      return null
    }
  }
}

// module.exports = htmlSerializer
export default htmlSerializer
