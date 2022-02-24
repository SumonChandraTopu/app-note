import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import "./Login.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    if (!values.email || !values.name || !values.password) {
      setError("Fill up the fields");
      return;
    }
    setError("");
    setButtonDisable(true);
    createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.name
    )
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");

        setButtonDisable(false);
      })
      .catch((err) => {
        setButtonDisable(false);
        setError(err.message);
      });
    setError("");
  };

  // Show or Hide password
  const handleShowPass = () => {
    setType("text");
    setIcon(false);
  };
  const handleHidePass = () => {
    setType("password");
    setIcon(false);
  };
  return (
    <div className="my-5">
      <div className="login-container p-4 w-25 mx-auto">
        <h2>Register</h2>
        <hr />
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              type="text"
              className="form-control login-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              type="email"
              className="form-control login-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  password: event.target.value,
                }))
              }
              type={type}
              className="form-control login-input"
              id="exampleInputPassword1"
            />
            {icon ? (
              <i onClick={handleShowPass} className="fa-solid fa-eye"></i>
            ) : (
              <i onClick={handleHidePass} className="fa-solid fa-eye-slash"></i>
            )}
          </div>
          <div className="error-message">
            <p className="">{error}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/login" className="btn btn-dark">
              Login
            </Link>
            <button
              disabled={buttonDisable}
              onClick={handleSignup}
              className="btn btn-dark"
            >
              Register
            </button>
          </div>
        </form>
        <div className="login-icon d-flex  py-3 align-items-center justify-content-center gap-4">
          <button className="fa-brands fa-google p-2 rounded-circle border-0"></button>
          <button className="fa-brands fa-facebook p-2 rounded-circle border-0"></button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
