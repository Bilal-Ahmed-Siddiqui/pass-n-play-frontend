import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    bank_Name: "",
    bank_AccountTitle: "",
    bank_AccountNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
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

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setdata({
            name: data.name || "",
            email: data.email || "",
            bank_Name: data.bank_Name || "",
            bank_AccountTitle: data.bank_AccountTitle || "",
            bank_AccountNumber: data.bank_AccountNumber || "",
          });
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        "http://localhost:8000/api/auth/updateuser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      alert("Info Updated Successfully");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Navbar />
      <div>
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
          <div>
            <p className="text-[30px] text-center">Edit Your Profile</p>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto p-8 bg-white shadow-md rounded  "
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bank_Name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Name:
                </label>
                <input
                  type="text"
                  name="bank_Name"
                  id="bank_Name"
                  value={data.bank_Name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bank_AccountTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Account Title:
                </label>
                <input
                  type="text"
                  name="bank_AccountTitle"
                  id="bank_AccountTitle"
                  value={data.bank_AccountTitle}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bank_AccountNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Account Number:
                </label>
                <input
                  type="text"
                  name="bank_AccountNumber"
                  id="bank_AccountNumber"
                  value={data.bank_AccountNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
