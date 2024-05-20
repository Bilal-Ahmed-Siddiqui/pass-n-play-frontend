import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import profileIcon from "../images/profile-icon.jpg";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
  const [name, setname] = useState("Your Name");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        setname(data.name);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="profile-info">
          <div className="profile-icon">
            <img src={profileIcon} alt="profile icon" />
          </div>
          <div>
            <h4>{name}</h4>
            <Link to="/Editprofile">Edit Profile</Link>
          </div>
        </div>
        <button className="btn closebtn" onClick={toggle}>
          ×
        </button>
      </div>
      <div className="separator-sidebar"></div>
      <ul className="list-group">
        <Link to="/" className="text-decoration-none link" onClick={toggle}>
          <div className="list-group-item">
            <i className="bi-house"></i>
            Home
          </div>
        </Link>
        <Link
          to="/myads"
          className="text-decoration-none link"
          onClick={toggle}
        >
          <div className="list-group-item">
            <i className="bi-controller"></i>
            My Ads
          </div>
        </Link>
        <Link
          to="/myorders"
          className="text-decoration-none link"
          onClick={toggle}
        >
          <div className="list-group-item">
            <i className="bi bi-bag"></i>
            My Orders
          </div>
        </Link>
        <Link
          to="/About"
          className="text-decoration-none link"
          onClick={toggle}
        >
          <div className="list-group-item">
            <i className="bi-info-circle"></i>
            About
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
