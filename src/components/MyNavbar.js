import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import { logout } from "../utils/users-reducer";
import {
  Button,
  Collapse,
  NavbarBrand,
  NavItem,
  NavLink,
  Navbar,
  Nav,
  Container
} from "reactstrap";
import "../App.css";
const MyNavbar = () => {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
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
    <Navbar
      className={path === '/' ? classnames("fixed-top", navbarColor, "pb-3", "pt-3") : `mb-2 pt-3 pb-3`}
    >

      <Container
      >
        {/* <div className="row">
          <div className="col-8"> */}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#b0b8bd",
                fontSize: "18px",
                margin:"30px"
              }}
              className="fw-bold"
            >
              EXERCISE MASTER
            </Link>
          {/* </div>

          <div className="col-4"> */}

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#b0b8bd",
                fontSize: "18px",
                margin: "30px"
              }}

          className={path === "/" ? "fw-bold header-item active" : "fw-bold header-item"}
            >
              Home
            </Link>
            <a
              href="/#exercises"
          style={{
            textDecoration: "none",
            color: "#b0b8bd",
            fontSize: "18px",
          }}              className={
                path.includes("#exercises") ? "fw-bold header-item active" : "fw-bold header-item"
              }
            >
              Exercises
            </a>
            
            
        {username === null ? (
          <Link
            style={{
              textDecoration: "none",
              color: "#b0b8bd",
              fontSize: "18px",
              textAlign: "end",
              justifyContent:"end",
              marginLeft:"400px"
            }}
            className={
              path === "/register" ? "fw-bold header-item active" : "fw-bold header-item"
            }
            to="/register"
          >
            Register
          </Link>
        ) : (
          ""
        )}
        {username === null ? (
          <Link
            style={{
              textDecoration: "none",
              color: "#b0b8bd",
              fontSize: "18px",
              margin:"30px"
            }}
            className={path === "/login" ? "fw-bold header-item active justify-content-end" : "fw-bold header-item justify-content-end"}
            to="/login"
          >
            Login
          </Link>
        ) : (
          ""
        )}
        {username !== null ? (
          <Link
            style={{
              textDecoration: "none",
              color: "#b0b8bd",
              fontSize: "18px",
              marginLeft:"400px"
            }}
            className={
              path === "/logout" ? "fw-bold header-item active" : "fw-bold header-item"
            }
            onClick={logOutBtnHandler}
          >
            Log out
          </Link>
        ) : (
          ""
        )}
        {username !== null ? (
          <Link
            style={{
              textDecoration: "none",
              color: "#b0b8bd",
              fontSize: "18px",
              margin:"30px"
            }}
            className={
              path === "/profile" ? "fw-bold header-item active" : "fw-bold header-item"
            }
            to="/profile"
          >
            Profile
          </Link>
        ) : (
          ""
        )}

        {/* </div>
        </div> */}
        </Container>
    </Navbar>
  );
};

export default MyNavbar;
