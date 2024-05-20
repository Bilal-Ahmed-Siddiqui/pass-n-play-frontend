import React, { useContext, useEffect, useState } from "react";
import postsContext from "../context/postsContext";
import Navbar from "./Navbar";
// import "../styles/postDetails.css";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const context = useContext(postsContext);
  const { fetchbyID, postbyID } = context;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setuser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchbyID(postId);
        if (localStorage.getItem("token")) {
          const response = await fetch(
            "http://localhost:8000/api/auth/getuser",
            {
              method: "GET",
              headers: {
                "Content-Type": "Application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          const data = await response.json();
          setuser(data._id);
        }
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
          <div className="container mx-auto p-4 flex">
            <img
              src="https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/21427/75639/dvd-7__43230.1706547744.png?c=2"
              className="w-96 h-96 mb-4"
              alt="Post"
            />
            <div className="p-4 bg-white shadow-md rounded-md">
              <h5 className="text-xl font-bold mb-2">{postbyID.title}</h5>
              <div className="mb-4">
                <p>
                  <span className="font-semibold">Description: </span>
                  {postbyID.description}
                </p>
              </div>
              <div className="flex">
                <div className="mb-4">
                  <p>
                    <span className="font-semibold">Condition: </span>
                    {postbyID.condition}
                  </p>
                  <p>
                    <span className="font-semibold">Location: </span>
                    {postbyID.location}
                  </p>
                  <p>
                    <span className="font-semibold">Posted On: </span>
                    {new Date(postbyID.timeStamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4 ml-20">
                  <p>
                    <span className="font-semibold">Rent Period: </span>
                    {postbyID.rentPeriod} Month(s)
                  </p>
                  <p>
                    <span className="font-semibold">Rent Price: </span>
                    {postbyID.rentPrice} Pkr/Month
                  </p>
                  <p>
                    <span className="font-semibold">Deposit Price: </span>
                    {postbyID.depositPrice} (Refundable)
                  </p>
                </div>
              </div>
              {postbyID.user !== user && (
                <Link
                  className="btn btn-dark bg-black text-white py-2 px-4 rounded-md"
                  to={`/Ordernow/${postId}`}
                >
                  Order now
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;
