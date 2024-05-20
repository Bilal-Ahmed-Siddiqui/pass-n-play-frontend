import React, { useState, useContext, useEffect } from "react";
import "../styles/newAd.css";
import postsContext from "../context/postsContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditAd = () => {
  const { postId } = useParams();

  const context = useContext(postsContext);
  const { UpdatePost, fetchUserPost, fetchbyID, postbyID } = context;
  const navigate = useNavigate();

  const [postData, setpostData] = useState({
    title: "",
    description: "",
    rentPeriod: "",
    location: "",
    condition: "",
    rentPrice: "",
    depositPrice: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          await fetchbyID(postId);
          console.log(postbyID);
          setpostData({
            title: postbyID.title || "",
            description: postbyID.description || "",
            rentPeriod: postbyID.rentPeriod || "",
            location: postbyID.location || "",
            condition: postbyID.condition || "",
            rentPrice: postbyID.rentPrice || "",
            depositPrice: postbyID.depositPrice || "",
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        navigate("/login");
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(postData);
    e.preventDefault();
    await UpdatePost(postId, postData);
    await fetchUserPost();
  };

  return (
    <div className="" style={{ zIndex: 3 }}>
      <div className="modal-content">
        <i className="bi bi-x close"></i>

        <div className="modal-header">
          <h3>Edit Your Listing</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                // onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Add Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={postData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Add location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={postData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="condition" className="form-label">
                  Condition
                </label>
                <select
                  className="form-select"
                  id="condition"
                  name="condition"
                  value={postData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="rentPeriod" className="form-label">
                  Rent Period (months)
                </label>
                <select
                  className="form-select"
                  id="rentPeriod"
                  name="rentPeriod"
                  value={postData.rentPeriod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Rent Period</option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="rentPrice" className="form-label">
                  Rent Price (Pkr/Month)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rentPrice"
                  name="rentPrice"
                  value={postData.rentPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="depositPrice" className="form-label">
                  Deposit Price (Refundable)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="depositPrice"
                  name="depositPrice"
                  value={postData.depositPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAd;
