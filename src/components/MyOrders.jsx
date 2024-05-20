import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setorders] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch(
            "http://localhost:8000/api/order/userorders",
            {
              method: "GET",
              headers: {
                "Content-Type": "Application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          const data = await response.json();
          setorders(data);
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
      <Navbar />
      <div className="">
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
          <div className=" mx-auto p-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{order.title}</h2>
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    } text-white`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    Return Date:{" "}
                    {new Date(order.returnDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Total Price: {order.totalPrice} PKR
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/orderdetails/${order._id}`)}
                  >
                    View Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
