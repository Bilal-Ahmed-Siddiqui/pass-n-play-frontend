import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import NewAd from "./NewAd";
import "../styles/myAds.css";
import postsContext from "../context/postsContext";
import { useNavigate } from "react-router-dom";

const MyAds = () => {
  const [isOpennew, setIsOpennew] = useState(false);
  const context = useContext(postsContext);
  const { userposts, fetchUserPost, deletePost, deleteStatus } = context;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleModalNew = () => {
    setIsOpennew(!isOpennew);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    alert(deleteStatus);
    await fetchUserPost();
  };
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          await fetchUserPost();
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch data. Please try again later.");
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="Ad-header box">
        <h2>Your Uploaded Adverts</h2>
        <i className="bi bi-plus-square" onClick={toggleModalNew}></i>
      </div>
      <NewAd isOpen={isOpennew} setIsOpen={setIsOpennew} />
      <div className="post-container">
        {loading ? (
          <div className="preloader text-center container-fluid my-3">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="container">
            <h5>{error}</h5>
          </div>
        ) : (
          <div className="myad-box">
            {userposts.map((userpost) => (
              <div key={userpost._id} className="post-wrapper">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton_${userpost._id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    &#10247;
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby={`dropdownMenuButton_${userpost._id}`}
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href={`/editpost/${userpost._id}`}
                      >
                        Edit Ad
                      </a>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleDelete(userpost._id)}
                      >
                        Delete Ad
                      </button>
                    </li>
                  </ul>
                </div>
                <Post
                  _id={userpost._id}
                  title={userpost.title}
                  price={userpost.price}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyAds;
