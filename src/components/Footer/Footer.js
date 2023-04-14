/* eslint-disable jsx-a11y/anchor-is-valid */
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul>
          <li>
            <b>SITE</b>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Site Guidelines</a>
          </li>
          <li>
            <img src="/images/neu_logo_footer.png" alt="NEU" />
          </li>
        </ul>
        <ul>
          <li>
            <b>LEGAL</b>
          </li>
          <li>
            <a href="https://www.northeastern.edu/emergency-information#_ga=2.20474808.162937863.1669921573-1244826038.1617331415">
              Emergency Information
            </a>
          </li>
          <li>
            <a href="https://www.northeastern.edu/privacy-information#_ga=2.20474808.162937863.1669921573-1244826038.1617331415">
              Privacy Information
            </a>
          </li>
          <li>
            <a href="https://policies.northeastern.edu/policy122/#_ga=2.20474808.162937863.1669921573-1244826038.1617331415">
              Digital Accessibility
            </a>
          </li>
          <li>
            <a href="https://oag.ca.gov/privacy/ccpa#:~:text=Businesses%20that%20sell%20personal%20information,order%20to%20submit%20your%20request.">
              CA Do Not Sell My Personal Information
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <b>PARTNERS</b>
          </li>
          <li>
            <a href="https://www.northeastern.edu/">Northeastern University</a>
          </li>
          <li>
            <a href="https://www.khoury.northeastern.edu/">
              Khoury College of Computer Science
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <b>CS5500 GROUP 9</b>
          </li>
          <li>
            <a href="https://www.facebook.com/northeastern/">Facebook</a>
          </li>
          <li>
            <a href="https://www.instagram.com/northeastern/">Instagram</a>
          </li>
          <li>
            <a href="https://twitter.com/Northeastern">Twitter</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/school/northeastern-university/">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="fText">
        Copyright © 2023 FitnessLover - CS5500 Group 9 · All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
