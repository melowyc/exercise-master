import "./registerandlogin.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../utils/users-thunks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
    e.preventDefault();
  };
  const togglePasswordTypeHandler = (lastState) => {
    setShowPassword(!lastState);
  };
  const LoginBtnHandler = () => {
    setError(null);
    const loginUser = { username, passwordInput };
    console.log("LoginBtnHandler", loginUser);
    dispatch(loginThunk(loginUser)).then((res) => {
      if (res.error) {
        setError(
          "Authentication failed! Either username is not found or the password is incorrect!"
        );
      } else {
        localStorage.setItem("username", username);
        navigate("/profile");
      }
    });
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (currentUser || username) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="row d-auth m-0">
          <div className="col">
            {!currentUser && <h1>Login</h1>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!currentUser && (
              <div className="d-control mt-4">
                <input
                  className="form-control mb-2 d-control-input"
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="input-group d-control mt-2 position-relative">
                  <input
                    className="form-control d-control-input mt-2"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    onChange={handlePasswordChange}
                    value={passwordInput}
                    placeholder="Password"
                  />
                  <div
                    className="btn position-absolute d-eye-icon"
                    onClick={() => togglePasswordTypeHandler(showPassword)}
                  >
                    {!showPassword ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </div>
                </div>
              </div>
            )}
            {!currentUser && (
              <div className="d-actions">
                <button
                  onClick={LoginBtnHandler}
                  className="d-actions-button w-100"
                >
                  Login
                </button>
                <Link to="/register">
                  <button type="button" className="d-actions-toggle">
                    New? Create a new account here
                  </button>
                </Link>
              </div>
            )}
            {currentUser && <h2>Welcome {currentUser.username}</h2>}
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
