import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex order-lg-2">
            {localStorage.getItem("token") ? (
              <button
                className="navbar-brand mb-0 h1 btn btn-secondary"
                onClick={HandleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                className="navbar-brand mb-0 h1 btn btn-secondary"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
          <div className="col-lg-4 order-lg-1">
            <form className="input-group w-100">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Navbar;
