import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const [order, setorder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pass-n-play-backend.vercel.app/api/order/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setorder(data);
        console.log(data);
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
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{order.title}</h2>
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
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="text-gray-600">
                  Created At: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <p className="text-gray-600">
                  Delivery Address: {order.deliveryAddress}
                </p>
                <p className="text-gray-600">
                  Delivery Price: {order.deliveryPrice} PKR
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <p className="text-gray-600">
                  Rent Amount: {order.rentAmount} PKR
                </p>
                <p className="text-gray-600">
                  Deposit Amount: {order.depositAmount} PKR
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <p className="text-gray-600">
                  Return Date: {new Date(order.returnDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Returnable Amount: {order.returnableAmount} PKR
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <p className="text-gray-600">
                  Total Price: {order.totalPrice} PKR
                </p>
              </div>
              <div className="mt-4">

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
