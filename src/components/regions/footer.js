import React from "react"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import FooterLogo from "../../../static/images/FooterLogo.png"
const FooterStyle = styled.footer`
  background-color: #152141;
  color: white;
  padding: 40px 0px 30px 0px;
  .footer-upper-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40px;
    border-bottom: 2px solid white;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .logo {
      width: 187px;
      img {
        width: 100%;
        height: auto;
      }
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
        flex-direction: column;
      }
      li {
        list-style: none;
        margin-left: 20px;
        &:first-child {
          margin-left: 0px;
        }
        @media (max-width: ${variable.mobileWidth}) {
          margin-left: 0px;
          margin-bottom: 10px;
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
  .footer-under-container {
    max-width: 533px;
    p {
      font-size: 10px;
      line-height: 15px;
    }
  }
`
const activeStyle = {
  textDecoration: "underline",
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
            <img src="../../images/FooterLogo.png" alt="logo" />
          </Link>
          <ul className="footer-main-menu">
            {nav.map((menuitem, index) => (
              <li key={index}>{menuRender(menuitem)}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="footer-container-below">
        <div class="footer-under-container">
          <p>
            1 The publicly-available information provided in and on this website
            is for informational purposes only. It provides business information
            about Alternative Wealth Partners, LLC
          </p>
          <p>
            This website is not intended to and does not constitute an offer to
            sell or the solicitation of an offer to purchase to any person in
            any jurisdiction. The contents of this website shall not be
            construed as legal, business or tax advise.
          </p>
        </div>
      </Container>
    </FooterStyle>
  )
}

export default Footer
