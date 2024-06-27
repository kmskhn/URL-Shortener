import { Layout } from "antd";
import android from "../../images/icon-android.svg";
import ios from "../../images/icon-ios.svg";
import fb from "../../images/icon-facebook.svg";
import twitter from "../../images/icon-twitter.svg";
import youtube from "../../images/icon-youtube.svg";
import insta from "../../images/icon-instagam.svg";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer id="main-footer">
      <div className="d-flex container" style={{ display: "flex" }}>
        <div className="footer__section">
          <p>Quick Links</p>
          <ul>
            <li>
              <a href="https://www.dm.gov.ae/faq/" aria-label="FAQ">
                FAQ
              </a>
            </li>
            <li>
              <a
                href="https://jobs.dubaicareers.ae/careersection/dubaicareers/jobsearch.ftl"
                aria-label="Careers"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Careers
              </a>
            </li>
            <li>
              <a href="https://www.dm.gov.ae/site-map/" aria-label="Sitemap">
                Sitemap
              </a>
            </li>
            <li>
              <a
                href="https://www.dm.gov.ae/contact/service-centers/"
                aria-label="Contact Us"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <p>Website T&Cs</p>
          <ul>
            <li>
              <a
                href="https://www.dm.gov.ae/website-policies/accessibility-information/"
                aria-label="Accessibility"
              >
                Accessibility
              </a>
            </li>
            <li>
              <a
                href="https://www.dm.gov.ae/website-policies/terms-and-conditions/"
                aria-label="Terms & Conditions"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="https://www.dm.gov.ae/website-policies/security-privacy/"
                aria-label="Security & Privacy"
              >
                Security & Privacy
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__section empty-col"></div>
        <div className="footer__section">
          <p>Download App</p>
          <ul className="footer-icon-apps">
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=ae.gov.dm.uma"
                aria-label="Android App"
                target="_blank"
                title="Download our Android App"
                rel="noopener noreferrer nofollow"
              >
                <img src={android} alt="Android App" />
              </a>
            </li>
            <li>
              <a
                href="https://apps.apple.com/ae/app/id1504636184"
                aria-label="iOS App"
                target="_blank"
                title="Download our iOS App"
                rel="noopener noreferrer nofollow"
              >
                <img src={ios} alt="iOS App" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <p>Follow Us</p>
          <ul className="footer-icon-social-media">
            <li>
              <a
                href="https://www.facebook.com/DubaiMunicipality"
                aria-label="Facebook"
                title="Go to our Facebook page"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <img src={fb} alt="Facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/DMunicipality"
                aria-label="Twitter"
                title="Go to our Twitter"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <img src={twitter} alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/user/DubaiMunicipalityUAE"
                aria-label="Youtube"
                title="Go to our Youtube channel"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <img src={youtube} alt="Youtube" />
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com/dubaimunicipality"
                aria-label="Instagram"
                target="_blank"
                title="Go to our Instagram page"
                rel="noopener noreferrer nofollow"
              >
                <img src={insta} alt="Instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="copyright__section container"
        style={{ display: "flex", justifyContent: "space-between", gap: "21%" }}
      >
        <div>
          <p>Copyright © 2024 Dubai Municipality, all rights reserved.</p>
          <p>This site is maintained by the Dubai Municipality.</p>
        </div>
        <div>
          <p>
            The site is best viewed using Microsoft Edge, Mozilla Firefox,
            Safari and Chrome.
          </p>
          <p style={{textAlign: 'right'}}>Page last modified: 20 June 2024</p>
        </div>
      </div>
    </Footer>
  );
};

export default Footer;
