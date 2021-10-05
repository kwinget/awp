import React from "react"
import Container from "../container"
import styled from "styled-components"
import * as variable from "../variables"
import phoneIcon from "../../images/phoneicon.png"
import emailIcon from "../../images/email.png"
import locationIcon from "../../images/locationicon.png"
const ContactStyle = styled.div`
  padding: 75px 0px;
  margin: 0 auto;
  max-width: 900px;
  .contact-outer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .contact-form-left {
    width: calc(75% - 35px);
    p {
      &:first-child {
        font-weight: 300;
      }
    }
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
      margin-bottom: 40px;
    }
  }
  .contact-form-right {
    width: 25%;
    font-size: 17px;
    line-height: 23px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
    }
    a {
      font-size: 17px;
      line-height: 23px;
    }
    .contact-phone {
      margin-bottom: 20px;
      background-image: url(${phoneIcon});
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: left top;
      padding-left: 40px;
    }
    .contact-email {
      margin-bottom: 20px;
      background-image: url(${emailIcon});
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: left top;
      padding-left: 40px;
    }
    .contact-address {
      background-image: url(${locationIcon});
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: left top;
      padding-left: 40px;
      div {
        &:last-child {
          font-weight: 300;
          line-height: 20px;
        }
        &:nth-child(2) {
          font-weight: 300;
          line-height: 20px;
        }
      }
    }
  }
  input {
    width: 100%;
    -webkit-appearance: none;
    border: 2px solid ${variable.green};
    border-radius: 7px;
    padding: 15px 20px;
    font-size: 17px;
    font-weight: 300;
    &::placeholder {
      color: ${variable.green};
      font-size: 17px;
      font-weight: 300;
    }
  }
  textarea {
    width: 100%;
    -webkit-appearance: none;
    border: 2px solid ${variable.green};
    border-radius: 7px;
    padding: 15px 20px;
    height: 240px;
    font-size: 17px;
    font-weight: 300;
    line-height: 24px;
    &::placeholder {
      color: ${variable.green};
      font-size: 17px;
      font-weight: 300;
    }
  }
  .hidden {
    display: none;
    -webkit-appearance: none;
  }
  .contact-submit {
    color: white;
    background-color: ${variable.green};
    padding: 12px 70px;
    font-size: 21px;
    margin-top: 25px;
  }
  .email-phone {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 25px 0px;
    input {
      width: calc(50% - 6px);
    }
  }
`
export const ContactSlice = ({ slice }) => {
  return (
    <Container>
      <ContactStyle>
        <div className="contact-outer">
          <div className="contact-form-left">
            <p>
              If you’re a cannabis company seeking a supplier or an investor looking to enter the cannabis market, send us a message to get in touch.
            </p>
            <form
              name="contact"
              method="POST"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human:{" "}
                  <input name="bot-field" />
                </label>
              </p>
              <input type="text" id="name" name="name" placeholder="Name" />
              <div className="email-phone">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />

                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                />
              </div>

              <textarea id="message" name="message" placeholder="Message" />

              <input type="submit" className="contact-submit" value="Submit" />
            </form>
          </div>
          <div className="contact-form-right">
            <div className="contact-phone">
              <a href="tel:905.581.3114">905.581.3114</a>
            </div>
            <div className="contact-email">
              <a href="mailto:marie.leblanc@massivebluemountain.com">
                contact@massivetherapeutics.com
              </a>
            </div>
            <div className="contact-address">
              <div>Massive Therapeutics</div>
              <div>Toronto, Canada</div>
              <div>Kingston, Jamaica</div>
            </div>
          </div>
        </div>
      </ContactStyle>
    </Container>
  )
}

export default ContactSlice
