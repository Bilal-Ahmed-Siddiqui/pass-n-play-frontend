import React, { useState } from "react";
import "../styles/login.css";
import Singup from "./Signup";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Creds, setCreds] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "Post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(Creds),
    });
    const json = await response.json();
    if (json.success) {
      //redirect to home page
      localStorage.setItem("token", json.authtoken);
      navigate('/');
      
    } else {
      alert(json.error);
    }
  };

  const onChange = (e) => {
    setCreds({ ...Creds, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="main-container">
        <div className="left">
          <p className="heading">
            Pass <span className="italic">n</span> Play
          </p>
          <p className="tagline">Dont just play.. Pass n Play</p>
        </div>
        <div className="separator-login"></div>
        <div className="right">
          <div className="loginform">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={Creds.email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={Creds.password}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn-primary btn">
                Login
              </button>
            </form>
            <p>
              New?{" "}
              <span onClick={toggleModal} className="link">
                Sign up
              </span>{" "}
              instead!
            </p>
          </div>
        </div>
      </div>
      <Singup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Login;
