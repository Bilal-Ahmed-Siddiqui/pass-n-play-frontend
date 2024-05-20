import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import MyAds from "./components/MyAds";
import PostDetails from "./components/PostDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostsState } from "./context/postsContext";
import EditAd from "./components/EditAd";
import OrderNow from "./components/OrderNow";
import EditProfile from "./components/EditProfile";
import MyOrders from "./components/MyOrders";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <PostsState>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/About" exact element={<About />} />
          <Route path="/Posts/:postId" exact element={<PostDetails />} />
          <Route path="/editpost/:postId" exact element={<EditAd />} />
          <Route path="/MyAds" exact element={<MyAds />} />
          <Route path="/OrderNow/:postId" exact element={<OrderNow />} />
          <Route path="/Editprofile" exact element={<EditProfile />} />
          <Route path="/Myorders" exact element={<MyOrders />} />
          <Route path="/Orderdetails/:orderId" exact element={<OrderDetails />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </Router>
    </PostsState>
  );
}

export default App;
