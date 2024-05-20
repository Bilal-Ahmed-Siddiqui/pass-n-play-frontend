import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import postsContext from "../context/postsContext";

const Home = () => {
  const context = useContext(postsContext);
  const { posts, fetchAll } = context;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAll();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar></Navbar>
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
          posts.map((post) => (
            <div
              style={{ flex: "0 0 calc(33.33% - 1rem)", margin: "1rem" }}
              key={post._id}
            >
              <Post
                _id={post._id}
                title={post.title}
                price={post.rentPrice}
              ></Post>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
