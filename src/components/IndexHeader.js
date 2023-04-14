/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import bgImage from "../assets/images/boxer.jpg"

// core components

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            `url(${bgImage})`
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Exercise Master</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              Keep Fit, Enjoy More!
            </h2>
          </Container>
        </div>
        <h6 className="category category-absolute">
          Designed and coded by CS5500-Group 9
        </h6>
      </div>
    </>
  );
}

export default IndexHeader;
