import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import * as variable from "../variables"
import MobileMenu from "../mobileMenu"
const HeaderStyle = styled.header`
  z-index: 2;
  width: 100%;
  background-size: cover;
  .header-social-container {
    padding: 18px 0px;
    @media (max-width: ${variable.tabletWidth}) {
      display: none;
    }
    .social-container {
      display: flex;
      justify-content: flex-end;
    }
    svg {
      font-size: 30px;
      path {
        color: white;
      }
    }
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .logo {
    max-width: 148px;
    width: 148px;
    img {
      max-width: 100%;
    }
  }

  .mobile-menu-container {
    width: 55px;
    margin-left: 20px;
  }
  ul.main-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    li {
      list-style: none;
      margin-right: 30px;
      position: relative;
      &:nth-child(5) {
        margin-right:15px;
        a {
          color: ${variable.blue};
          border: 2px solid ${variable.blue};
          padding: 9px 20px;
          border-radius: 5px;
          &:hover {
            background: ${variable.blue};
            color: white !important;
            border: 2px solid rgba(255, 255, 255, 0);
          }
        }
      }
      &:last-child {
        margin-right: 0px;
        a {
          background: ${variable.blue};
          color: white;
          padding: 9px 20px;
          border-radius: 5px;
          border: 2px solid rgba(255, 255, 255, 0);
          &:hover {
            background: white;
            color: ${variable.blue} !important;
            border: 2px solid ${variable.blue};
          }
          /* &[aria-current] {
            color: ${variable.blue} !important;
            &:hover {
              background: ${variable.blue};
              color: white !important;
            }
          } */
        }
      }
      
      a {
        text-decoration: none;
        color: ${variable.blue};
        font-size: 20px;
        font-weight: bold;
        &:hover {
          color: ${variable.blue};
          text-decoration: underline;
        }
      }
      .sub-menu {
        display: none;
        background-color: ${variable.blue};
        padding: 10px 20px 0px 20px;
        border: 1px solid #dadde9;
        position: absolute;
        top: 40px;
        left: -35px;
        z-index: 100;
        border-radius: 2px;
        min-width: 145px;
        animation-duration: 4s;
        a {
          color: ${variable.blue};
          font-size: 16px;
          margin-bottom: 10px;
          display: block;
          text-transform: capitalize;
          padding: 0px;
          font-weight: bold;
        }
      }
      &:hover .sub-menu {
        display: block;
      }
    }
  }
  .mobile-menu-container {
    display: none;
  }
  @media (max-width: ${variable.tabletWidth}) {
    .mobile-menu-container {
      display: block;
    }
    ul.main-menu {
      display: none;
    }
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
        <Link to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
        <div className="sub-menu">
          {menuitem.items.map((submenuitem, index) => (
            <div key={index}>
              {submenuitem.sub_nav_link.url && (
                <Link to={submenuitem.sub_nav_link.url}>
                  {submenuitem.sub_nav_link_label.text}
                </Link>
              )}
              {submenuitem.relative_link.text && (
                <Link to={submenuitem.relative_link.text}>
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
        <Link to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
      )
    }
    if (menuitem.primary.relative_link) {
      return (
        <Link to={menuitem.primary.relative_link.text}>
          {menuitem.primary.label.text}
        </Link>
      )
    }
  }
}

export const Header = () => {
  const data = useStaticQuery(graphql`
    query menu {
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
    <HeaderStyle className="header">
      <Container className="header-container">
        <Link className="logo" to="/">
          <Img fluid={logo} alt="logo" />
        </Link>
        <div className="mobile-menu-container">{<MobileMenu />}</div>
        <ul className="main-menu">
          {nav.map((menuitem, index) => (
            <li key={index}>{menuRender(menuitem)}</li>
          ))}
        </ul>
      </Container>
    </HeaderStyle>
  )
}

export default Header
