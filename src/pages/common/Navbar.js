import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";

import "./Common.css";

const Navbar = () => {
  // const [displayName] = user;
  // console.log(displayName);
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])

  const navigate = useNavigate()

  const handleSignOut = e => {
    e.preventDefault();
    signOut(auth)
    .then(() => {
      navigate("/login")
    })
  }
  
  return (
    <div>
      <header className="navbar-container shadow">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container nav-contain">
            <Link to="/" className="navbar-brand">
              App Note
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about-us" className="nav-link">
                    About Us
                  </Link>
                </li>
              </ul>
               {
                 user && <span className="px-3">Welcome {user.displayName}</span>
               }
                {user ?<button  className="btn btn-dark 
               " onClick={handleSignOut}>Logout</button>
                : <Link  className="btn btn-dark 
                " to="/login" >Login</Link>}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
