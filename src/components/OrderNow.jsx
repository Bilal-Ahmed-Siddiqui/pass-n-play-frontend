import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import postsContext from "../context/postsContext";
import { useNavigate } from "react-router-dom";

const OrderNow = () => {
  const [copyText, setCopyText] = useState("");
  const { postId } = useParams();
  const context = useContext(postsContext);
  const { fetchbyID, postbyID } = context;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const navigate = useNavigate();
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [orderId, setorderId] = useState("Order id");

  const copyToClipboard = async (e) => {
    setCopyText(e);
    await navigator.clipboard.writeText(copyText);
    alert("Copied to Clipboard!");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          await fetchbyID(postId);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
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

  useEffect(() => {
    const calc_returnDate = () => {
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setMonth(currentDate.getMonth() + postbyID.rentPeriod);
      setReturnDate(futureDate);
    };
    calc_returnDate();
    // eslint-disable-next-line
  }, [postbyID]);

  const HandlePlaceOrder = async () => {
    if (!deliveryAddress) {
      alert("Please enter your delivery address");
      return;
    }
    const order = {
      post: postId,
      title: postbyID.title,
      deliveryAddress: deliveryAddress,
      DeliveryPrice: 500,
      totalPrice: postbyID.depositPrice + 500,
      rentAmount: postbyID.rentPrice,
      depositAmount: postbyID.depositPrice,
      returnableAmount:
        postbyID.depositPrice - postbyID.rentPeriod * postbyID.rentPrice,
      returnDate: returnDate,
    };
    try {
      const response = await fetch("https://pass-n-play-backend.vercel.app/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      setorderId(data.order._id);
      if (data.success) {
        alert("order placed!");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>
      <Navbar></Navbar>
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
          <div className="m-2">
            <div className="border border-5 border-[#6c757d] mx-2 my-3 px-5 py-2">
              <p className="text-[30px] font-bold ">Ad Details</p>
              <div className="flex my-2 ml-20">
                <img
                  src="https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/21427/75639/dvd-7__43230.1706547744.png?c=2"
                  alt="Post"
                  className="w-60 border border-3"
                />
                <div className="ml-10 mt-8 ">
                  <p className="text-[18px]">
                    <span className="font-semibold">Title: </span>
                    {postbyID.title}
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Rent Period: </span>
                    {postbyID.rentPeriod} Month(s)
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Rent Price: </span>
                    {postbyID.rentPrice} Pkr/Month
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Deposit Price: </span>
                    {postbyID.depositPrice} (Returnable)
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-5 border-[#6c757d] mx-2 my-3 px-5 py-2">
              <p className="text-[30px] font-bold ">Order Details</p>
              <div className="mx-20">
                <div className="mb-4">
                  <label
                    htmlFor="deliveryAddress"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    * Delivery Address:
                  </label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    placeholder="Enter your delivery address"
                    required
                    onChange={(e) => setdeliveryAddress(e.target.value)}
                    className="w-[500px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="p-4 bg-gray-100">
                  <div className="flex justify-between pt-3">
                    <p>Rent Amount:</p>
                    <p>{postbyID.rentPeriod * postbyID.rentPrice} PKR</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Deposit Amount:</p>
                    <p>{postbyID.depositPrice} PKR</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery Charges:</p>
                    <p>500 PKR</p>
                  </div>
                  <div className="flex justify-between pt-2 font-semibold">
                    <p>Total:</p>
                    <p>{postbyID.depositPrice + 500} PKR</p>
                  </div>
                </div>
                <p className=" text-gray-700 font-semibold mb-0">Note: </p>
                <p>
                  Amount Returned after DVD is delivered back:{" "}
                  <span className="font-thin bg-slate-300">
                    {postbyID.depositPrice -
                      postbyID.rentPeriod * postbyID.rentPrice}
                    PKR
                  </span>
                  <br />
                  Must be returned by:{" "}
                  <span className="font-thin bg-slate-300">
                    {returnDate.toDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="border border-5 border-[#6c757d] mx-2 my-3 px-5 py-2">
              <p className="text-[30px] font-bold ">Payment Method</p>
              <div className="ml-20">
                <p>
                  <span className="font-semibold">Step 1:</span> Send your total
                  amount{" "}
                  <span className="font-thin bg-slate-300">
                    {postbyID.depositPrice + 500}
                  </span>{" "}
                  to our business account
                </p>
                <div className="w-[400px] ml-20 bg-gray-100 p-4">
                  <p className="pt-3">
                    <span className="font-semibold">Bank Name:</span> SadaPay
                  </p>
                  <p>
                    <span className="font-semibold">Account Title:</span> Bilal
                    Ahmed
                  </p>
                  <p>
                    <span className="font-semibold">Account Number:</span>{" "}
                    03152773834
                    <i
                      className="bi bi-copy ml-2"
                      onClick={copyToClipboard}
                    ></i>
                  </p>
                </div>
                <p className="mt-8">
                  <span className="font-semibold">Step 2:</span> Take a
                  Screenshot of your payment and whatsapp us on given number,
                  along with your order id{" "}
                  <span className="font-thin text-[16px]">
                    *Generated when you click Place Order
                  </span>
                </p>
                <div className="font-semibold w-[400px] ml-20 bg-gray-100 p-4">
                  <p className="pt-3">
                    Order id: <span className="font-normal">{orderId}</span>
                    <i
                      className="bi bi-copy ml-2"
                      onClick={copyToClipboard}
                    ></i>
                  </p>
                  <p>
                    WhatsApp: <span className="font-normal">03132357285</span>
                    <i
                      className="bi bi-copy ml-2"
                      onClick={copyToClipboard}
                    ></i>
                  </p>
                </div>
                <p className="mt-8">
                  <span className="font-semibold">Step 3:</span> We will verify
                  Your payment within 12 Hours and proceed with your order.
                  Happy Gaming!
                </p>
                <button
                  className="bg-[#6c757d] hover:bg-[#5f666d] text-white font-bold py-2 px-4 rounded ml-20 mb-4"
                  onClick={HandlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderNow;
