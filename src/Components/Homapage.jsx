import "../css/homepage.css";
import NewPost from "./NewPost";
import TopNavbar from "./TopNavbar";
import { useSelector } from "react-redux";
import UserSmallDashboard from "./UserSmallDashboard";
import SuggestFriends from "./SuggestFriends";
import PostWithoutPosition from "./PostWithoutPosition";

const Homepage = () => {
  const currentUser = useSelector((state) => state.user.userInfo);
  return (
    <>
      <TopNavbar />
      <div className="hp-main-container">
        <div className="hp-sec-container">
          <UserSmallDashboard />
          <div className="up-right-container">
            <NewPost user={currentUser} />
            <PostWithoutPosition />
          </div>
          <SuggestFriends />
        </div>
      </div>
    </>
  );
};

export default Homepage;
