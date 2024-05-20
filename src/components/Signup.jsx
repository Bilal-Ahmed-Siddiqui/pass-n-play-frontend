import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

const Singup = (props) => {
  const [Creds, setCreds] = useState({ name: "", email: "", password: "" });
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/signup", {
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
      navigate("/");
    } else {
      alert(json.error);
    }
  };
  const onChange = (e) => {
    setCreds({ ...Creds, [e.target.name]: e.target.value });
  };
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <button className="close btn" onClick={toggleModal}>
          &times;
        </button>

        <div className="modal-header">
          <div className="head">
            <h3>WELCOME, LETS GET YOU IN QUICKLY!</h3>
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSignup}>
            <label htmlFor="name">name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              onChange={onChange}
              required
              minLength={5}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              required
              minLength={5}
            />
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
