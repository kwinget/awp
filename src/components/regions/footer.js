import React from "react"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"

const FooterStyle = styled.footer`
  background-color: #000000;
  color: white;
  padding: 30px 0px 20px 0px;
  .footer-upper-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .logo {
      width: 311px;
    }
    ul.footer-main-menu {
      width: calc(100% - 120px);
      display: flex;
      justify-content: space-between;
      justify-content: flex-end;
      align-items: center;
      margin-left: 0px;
      padding-left: 0px;
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        justify-content: center;
        align-items: center;
      }
      li {
        list-style: none;
        margin-left: 20px;
        &:first-child {
          margin-left: 0px;
        }
      }
      a {
        color: white;
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .footer-under-container {
    color: white;
    opacity: 50%;
    margin-top: 40px;
    font-size: 18px;
    @media (max-width: ${variable.mobileWidth}) {
      text-align: center;
    }
  }
  .footer-border {
    width: 100%;
    height: 2px;
    background-color: #383737;
  }
`
const activeStyle = {
  color: variable.blue,
}
function menuRender(menuitem) {
  if (
    menuitem.items[0].sub_nav_link_label.text != "" &&
    menuitem.items[0].sub_nav_link_label.text != "Dummy"
  ) {
    return (
      <div>
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
        <div className="sub-menu">
          {menuitem.items.map((submenuitem, index) => (
            <div key={index}>
              {submenuitem.sub_nav_link.url && (
                <Link
                  activeStyle={activeStyle}
                  to={submenuitem.sub_nav_link.url}
                >
                  {submenuitem.sub_nav_link_label.text}
                </Link>
              )}
              {submenuitem.relative_link.text && (
                <Link
                  activeStyle={activeStyle}
                  to={submenuitem.relative_link.text}
                >
                  {submenuitem.sub_nav_link_label.text}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    if (menuitem.primary.link.url != "") {
      return (
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
      )
    }
    if (menuitem.primary.relative_link) {
      return (
        <Link
          activeStyle={activeStyle}
          to={menuitem.primary.relative_link.text}
        >
          {menuitem.primary.label.text}
        </Link>
      )
    }
  }
}
export const Footer = () => {
  const data = useStaticQuery(graphql`
    query footermenu {
      site: allPrismicSiteInformation {
        nodes {
          data {
            nav {
              ... on PrismicSiteInformationNavNavItem {
                id
                items {
                  sub_nav_link {
                    url
                    link_type
                  }
                  sub_nav_link_label {
                    text
                  }
                  relative_link {
                    text
                  }
                }
                primary {
                  label {
                    text
                  }
                  link {
                    url
                    link_type
                  }
                  relative_link {
                    text
                  }
                }
              }
            }
            logo {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            twitter {
              url
            }
          }
        }
      }
    }
  `)
  const nav = data.site.nodes[0].data.nav
  const logo = data.site.nodes[0].data.logo.localFile.childImageSharp.fluid
  return (
    <FooterStyle>
      <Container className="footer-container">
        <div class="footer-upper-container">
          <Link className="logo" to="/">
            <Img fluid={logo} alt="logo" />
          </Link>
          <ul className="footer-main-menu">
            {nav.map((menuitem, index) => (
              <li key={index}>{menuRender(menuitem)}</li>
            ))}
          </ul>
        </div>
      </Container>
      <div class="footer-border"></div>
      <Container className="footer-container-below">
        <div class="footer-under-container">
          &copy; {new Date().getFullYear()} Massive Therapeutics | All Rights
          Reserved
        </div>
      </Container>
    </FooterStyle>
  )
}

export default Footer
