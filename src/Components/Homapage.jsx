import "../css/homepage.css";
import NewPost from "./NewPost";
import TopNavbar from "./TopNavbar";
import UserSmallDashboard from "./UserSmallDashboard";
import SuggestFriends from "./SuggestFriends";
import HomepageAllPost from "./HomapageAllPost";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  const loadPost = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/post/");
      if (response.ok) {
        let result = await response.json();
        setPosts(result.reverse());
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="hp-main-container">
        <div className="hp-sec-container">
          <UserSmallDashboard />
          <div className="up-right-container">
            <NewPost post={posts} loadPost={() => loadPost()} />
            <HomepageAllPost posts={posts} loadPost={() => loadPost()} />
          </div>
          <SuggestFriends />
        </div>
      </div>
    </>
  );
};

export default Homepage;
