import React, { useState } from "react";

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase/Firebase";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();

  // 
  const handleLogIn = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setError("Fill up the fields");
      return;
    }
    setError("");
    setButtonDisable(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        const user = res.user
         updateProfile(user);
        navigate("/");

        setButtonDisable(false);
      })
      .catch((err) => {
        setButtonDisable(false);
        setError(err.message);
      });
    setError("");
  };

   // Google Authentication

   const handleGoogleSigIn = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      navigate("/");
    })
    .catch(err => {
      setError(err.message)
    })
    setError("")
  };

  // Password show & hide
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
        <h2>Log in</h2>
        <hr />
        <form>
          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              onChange={(e) =>
                setValues((previous) => ({
                  ...previous,
                  email: e.target.value,
                }))
              }
              type="email"
              class="form-control login-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 position-relative">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              onChange={(e) =>
                setValues((previous) => ({
                  ...previous,
                  password: e.target.value,
                }))
              }
              type={type}
              class="form-control login-input"
              id="exampleInputPassword1"
            />
            {icon ? (
              <i onClick={handleShowPass} className="fa-solid fa-eye"></i>
            ) : (
              <i onClick={handleHidePass} className="fa-solid fa-eye-slash"></i>
            )}
          </div>
          <div class="mb-3 ">
            <label class="">
              <Link to="# ">Forget Password?</Link>
            </label>
          </div>
          <div className="error-message">
            <p className="">{error}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button
              disabled={buttonDisable}
              onClick={handleLogIn}
              class="btn btn-dark"
            >
              Login
            </button>
            <Link to="/signup" class="btn btn-dark">
              Register
            </Link>
          </div>
        </form>
        <div className="login-icon d-flex  py-3 align-items-center justify-content-center gap-4">
          <button onClick={handleGoogleSigIn} class="fa-brands fa-google p-2 rounded-circle border-0"></button>
          <button class="fa-brands fa-facebook p-2 rounded-circle border-0"></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
