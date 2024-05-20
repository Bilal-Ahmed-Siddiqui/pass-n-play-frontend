import { createContext, useState } from "react";

const postsContext = createContext();

export const PostsState = (props) => {
  const [posts, setposts] = useState([]);
  const [userposts, setuserposts] = useState([]);
  const [postbyID, setpostbyID] = useState([]);
  const [deleteStatus, setdeleteStatus] = useState();
  const url = "https://pass-n-play-backend.vercel.app";

  //api call fetch all
  const fetchAll = async () => {
    //api call
    const response = await fetch(`${url}/api/post/fetchall`, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    //update client side
    const data = await response.json();
    setposts(data);
  };

  //api call fetch post by id
  const fetchbyID = async (id) => {
    //api call
    const response = await fetch(`${url}/api/post/${id}`, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    //update client side
    const data = await response.json();
    setpostbyID(data);
  };

  //api call fetch user post
  const fetchUserPost = async () => {
    //api call
    const response = await fetch(`${url}/api/post/userposts`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    //update client side
    const data = await response.json();
    setuserposts(data);
  };

  //api call delete post
  const deletePost = async (id) => {
    //api call
    const response = await fetch(`${url}/api/post/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete Ad!");
    }

    //update client side
    const data = await response.json();
    setdeleteStatus(data);
  };

  //api call create new post
  const CreatePost = async (Post) => {
    //api call
    const response = await fetch(`${url}/api/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(Post),
    });

    if (!response.ok) {
      throw new Error("Failed to Post Ad");
    }

    //update client side
    // const data = await response.json();
    // setuserposts(data);
  };

  //api call create new post
  const UpdatePost = async (id, Post) => {
    //api call
    const response = await fetch(`${url}/api/post/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(Post),
    });

    if (!response.ok) {
      throw new Error("Failed to Edit Ad");
    }

    // update client side
    // const data = await response.json();
    // setuserposts(data);
  };

  return (
    <postsContext.Provider
      value={{
        posts,
        setposts,
        fetchAll,
        userposts,
        setuserposts,
        fetchUserPost,
        deletePost,
        CreatePost,
        fetchbyID,
        postbyID,
        deleteStatus,
        UpdatePost,
      }}
    >
      {props.children}
    </postsContext.Provider>
  );
};

export default postsContext;
