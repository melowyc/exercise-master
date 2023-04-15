import "./registerandlogin.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (currentUser || username) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://cs5500-proj-server.onrender.com/users/${param.username}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="row d-auth m-0">
          {!currentUser && <h1>Email Verify</h1>}
          {!currentUser && validUrl && (
            <div className="d-control mt-4">
              <img src="/images/verifysuccess.jpg" alt="success"></img>
              <h1>Email verified successfully</h1>
              <Link to="/login">
                <button className="d-actions-button w-100">Login</button>
              </Link>
            </div>
          )}
          {!currentUser && !validUrl && <h1>404 Not Found</h1>}
          {currentUser && <h2>Welcome {currentUser.username}</h2>}
        </div>
        <div className="col-6"></div>
      </div>
    </>
  );
};

export default EmailVerify;
