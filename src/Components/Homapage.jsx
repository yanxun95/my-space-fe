import "../css/homepage.css";
import NewPost from "./NewPost";
import TopNavbar from "./TopNavbar";
import { useSelector } from "react-redux";
import UserSmallDashboard from "./UserSmallDashboard";
import SuggestFriends from "./SuggestFriends";
import PostWithoutPosition from "./PostWithoutPosition";

const Homepage = () => {
  return (
    <>
      <TopNavbar />
      <div className="hp-main-container">
        <div className="hp-sec-container">
          <UserSmallDashboard />
          <div className="up-right-container">
            <NewPost />
            <PostWithoutPosition />
          </div>
          <SuggestFriends />
        </div>
      </div>
    </>
  );
};

export default Homepage;
