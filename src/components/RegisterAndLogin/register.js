import "./registerandlogin.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { COUNTRY_OPTIONS } from "./countriesData.js";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../utils/users-thunks";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [userType, setUserType] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userTypeOptions = [
    {
      key: "Student",
      text: "Student",
      value: "STUDENT",
      image: { avatar: true, src: "/images/avatar/student.jpg" },
    },
    {
      key: "Fitness trainer/Gym coach",
      text: "Fitness trainer/Gym coach",
      value: "PRO",
      image: { avatar: true, src: "/images/avatar/pro.jpg" },
    },
    {
      key: "Admin",
      text: "Admin",
      value: "ADMIN",
      image: { avatar: true, src: "/images/avatar/admin.png" },
    },
  ];
  COUNTRY_OPTIONS.map((option) => {
    return (option.flag = option.flag.toLowerCase());
  });

  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleRegisterBtn = () => {
    if (password !== validatePassword) {
      setError("Passwords must match!");
      return;
    } else if (
      username === "" ||
      password === "" ||
      validatePassword === "" ||
      userType === "" ||
      country === "" ||
      gender === ""
    ) {
      setError("Error! Fields below must be filled!");
      return;
    }
    setError(null);
    console.log("userType is: ", userType);
    const newUser = { username, password, country, gender, userType };
    dispatch(registerThunk(newUser)).then((res) => {
      console.log(res);
      if (res.error) {
        setError("Registration failed! Username already exists!");
      } else {
        navigate("/login");
      }
    });
  };
  const togglePasswordTypeHandler = (lastState) => {
    setShowPassword(!lastState);
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
            <h1>Register</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-control">
              <label htmlFor="userType" className="mt-2">
                User Type
              </label>
              <Dropdown
                placeholder="Please Select Your User Type*"
                fluid
                required
                selection
                clearable
                options={userTypeOptions}
                value={userType}
                id="userType"
                onChange={(e, item) => {
                  setUserType(item.value);
                }}
              ></Dropdown>
              <label htmlFor="username" className="mt-2">
                Username
              </label>
              <input
                className="form-control mb-2 mt-2 d-control-input"
                value={username}
                placeholder="Please input a unique username*"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="country" className="mt-2">
                Select Your Country
              </label>
              <Dropdown
                id="country"
                placeholder="Select Country"
                required
                value={country}
                fluid
                search
                selection
                options={COUNTRY_OPTIONS}
                onChange={(e, item) => {
                  setCountry(item.value);
                }}
              />
              <label htmlFor="gender" className="mt-2">
                Select Your Gender
              </label>
              <div className="row" id="gender">
                <div className="col-sm custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="gender1"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={onGenderChange}
                    className="custom-control-input"
                  />
                  <label
                    className="col-sm custom-control-label"
                    htmlFor="gender1"
                  >
                    Female
                  </label>
                </div>
                <div className="col-sm custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="gender2"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={onGenderChange}
                    className="custom-control-input"
                  />
                  <label
                    className="col-sm custom-control-label"
                    htmlFor="gender2"
                  >
                    Male
                  </label>
                </div>
                <div className="col-sm custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="gender3"
                    name="gender"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={onGenderChange}
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="gender3">
                    Other
                  </label>
                </div>
              </div>
              <label htmlFor="password" className="mt-2">
                Password
              </label>
              <div className="input-group d-control mt-2 position-relative">
                <input
                  className="form-control mb-2 mt-2 d-control-input"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="btn border-right position-absolute mb-0 d-eye-icon"
                  onClick={() => togglePasswordTypeHandler(showPassword)}
                >
                  {!showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </div>
              </div>
              <label htmlFor="password2">Retype Password</label>
              <div className="input-group d-control mt-2">
                <input
                  className="form-control mb-2 d-control-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Retype password*"
                  value={validatePassword}
                  onChange={(e) => setValidatePassword(e.target.value)}
                  required
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
            <div className="d-actions">
              <button
                onClick={handleRegisterBtn}
                className="d-actions-button w-100"
              >
                Register
              </button>
              <Link to="/login">
                <button type="button" className="d-actions-toggle">
                  Already have an account? Login here
                </button>
              </Link>
            </div>
            {currentUser && <h2>Welcome {currentUser.username}</h2>}
          </div>
          <div className="col-5"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
