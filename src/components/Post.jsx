import React from "react";
import "../styles/post.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { _id, title, price } = props;
  return (
    <div key={_id} className="card post-card">
      <img
        src="https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/21427/75639/dvd-7__43230.1706547744.png?c=2"
        className="card-img-top post-img"
        alt="Post"
      />
      <div className="card-body">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Price: {price} Pkr/Month</p>
        </div>
        <Link className="btn btn-dark" to={`/posts/${_id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Post;
