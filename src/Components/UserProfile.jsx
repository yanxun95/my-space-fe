import "../css/userProfile.css";
import UserFriends from "./UserFriends.jsx";
import UserInfo from "./UserInfo.jsx";
import UserPhotos from "./UserPhotos.jsx";
import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";
import { useState, useEffect } from "react";

const UserProfile = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/post/user/61bc9af98a6d7cb5eff156ee"
      );
      if (response.ok) {
        let result = await response.json();
        setPosts(result);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="up-main-container">
      <div className="up-top-container">
        <div className="up-bg-container">
          <img src={currentUser.bgImage} className="up-bg-image" alt="" />
        </div>
        <div className="up-user-container">
          <div className="up-user-img-container">
            <img src={currentUser.userImage} className="up-user-image" alt="" />
          </div>
          <div id="up-user-info" className="up-user-info">
            <div className="up-user-name">
              {currentUser.name + " " + currentUser.surname}
            </div>
            <div className="up-user-friends">150 Friends</div>
          </div>
        </div>
      </div>

      <div className="up-second-container">
        <div className="up-left-container">
          <UserInfo currentUser={currentUser} />
          <UserPhotos currentUser={currentUser} />
          <UserFriends currentUser={currentUser} />
        </div>
        <div className="up-right-container">
          <NewPost currentUser={currentUser} />
          {posts.map((post) => (
            <Post currentUser={currentUser} post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
