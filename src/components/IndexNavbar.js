
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { logout } from "../utils/users-reducer";
import "../App.css";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  const username = localStorage.getItem("username");
  const path = useLocation().pathname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutBtnHandler = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate mt-2">
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            target="_blank"
          >
            Exercise Master
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                to="/"
                className={path === "/" ? "header-item active" : "header-item"}
              >
                Home
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink
                to="#exercises"
                // style={{ textDecoration: "none", color: "#3A1212" }}
                className={
                  path === "#exercises" ? "header-item active" : "header-item"
                }
              >
                Exercise
              </NavLink>
            </NavItem>



            {username !== null ? (

              <NavItem>
                <NavLink
                  href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-index-navbar"
                  target="_blank"
                >
                  profile
                </NavLink>
              </NavItem>
            ) : (
              ""
            )}


            {username !== null ? (

              <NavItem>
                <NavLink
                  className={
                    path === "/logout" ? "header-item active" : "header-item"
                  }
                  onClick={logOutBtnHandler} 
                  target="_blank"
                >
                  Log out
                </NavLink>
              </NavItem>
            ) : (
              ""
            )}

            {username === null ? (
              <NavItem>
                <NavLink
                  className={path === "/login" ? "header-item active" : "header-item"}
                  to="/login"
                  target="_blank"
                >
                  Log in
                </NavLink>
              </NavItem>
            ) : (
              ""
            )}

            {username === null ? (
            <NavItem>
              <Button
                className={
                  path === "/register" ? "header-item active" : "header-item"
                }
                to="/register"
                color="danger"
                  target="_blank"
              >
                 Register
              </Button>
            </NavItem>
            ) : (
              ""
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
