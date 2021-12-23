import "../css/userProfile.css";
import UserFriends from "./UserFriends.jsx";
import UserInfo from "./UserInfo.jsx";
import UserPhotos from "./UserPhotos.jsx";
import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";
import { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar.jsx";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [position, setPosition] = useState({});
  const [accessToken, setAccessToken] = useState(" ");

  const loadPosition = async () => {
    let url = window.location.search;
    let searchParams = new URLSearchParams(url);
    let userId = searchParams.get("id");
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise/" + userId,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (response.ok) {
        let result = await response.json();
        setPosition(result[0]);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = () => {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("=");
    setAccessToken(cArr[1]);
  };

  const getPosts = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL +
          "/post/user/" +
          process.env.REACT_APP_USERID
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

  const getCurrentUser = async () => {
    let url = window.location.search;
    let searchParams = new URLSearchParams(url);
    let userId = searchParams.get("id");
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/user/" + userId
      );
      if (response.ok) {
        let result = await response.json();
        setCurrentUser(result);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getCurrentUser();
  }, []);

  useEffect(() => {
    getToken();
    if (accessToken !== " ") {
      loadPosition();
    }
  }, [accessToken]);

  return (
    <>
      <TopNavbar currentUser={currentUser} />
      <div className="up-main-container">
        <div className="up-top-container">
          <div
            className="up-bg-container"
            style={{ transform: `translate3d(${position.userBgImage})` }}
          >
            <img src={currentUser.bgImage} className="up-bg-image" alt="" />
          </div>
          <div
            className="up-user-container"
            style={{ transform: `translate3d(${position.userInfo})` }}
          >
            <div className="up-user-img-container">
              <img
                src={currentUser.userImage}
                className="up-user-image"
                alt=""
              />
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
    </>
  );
};

export default UserProfile;
