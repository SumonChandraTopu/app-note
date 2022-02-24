import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./pages/common/Footer";
import Navbar from "./pages/common/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
