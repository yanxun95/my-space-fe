/* eslint-disable react-hooks/exhaustive-deps */
import "../css/userProfile.css";
import UserFriends from "./UserFriends.jsx";
import UserInfo from "./UserInfo.jsx";
import UserPhotos from "./UserPhotos.jsx";
import PostWithPosition from "./PostWithPosition.jsx";
import NewPost from "./NewPost.jsx";
import { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sortable from "sortablejs";
import { Spinner } from "react-bootstrap";

const UserProfile = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.userInfo);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [position, setPosition] = useState({});
  const [accessToken, setAccessToken] = useState("");

  const loadPosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise/" + id
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
        process.env.REACT_APP_BE_URL + "/post/user/" + id
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

  const getPossition = () => {
    let mainContainer = document.querySelector(".up-second-container");
    let sortable = Sortable.create(mainContainer, {
      group: "mainContainer",
      store: {
        get: function (sortable) {
          var order = position.mainPosition;
          return order ? order.split("|") : [];
        },
      },
    });
    let state = sortable.option("disabled");
    sortable.option("disabled", !state);
  };

  const loadUserProfile = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/user/" + id
      );
      if (response.ok) {
        let result = await response.json();
        setUser(result);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    if (accessToken !== " ") {
      loadPosition();
    }
  }, [accessToken]);

  useEffect(() => {
    loadPosition();
    loadUserProfile();
    getPossition();
    getPosts();
  }, [id]);

  useEffect(() => {
    position.mainPosition !== undefined && getPossition();
  }, [position]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="up-main-container">
        {position !== {} && (
          <>
            <div className="up-top-container">
              <div
                className="up-bg-container"
                style={{ transform: `translate3d(${position.userBgImage})` }}
              >
                <img src={user.bgImage} className="up-bg-image" alt="" />
              </div>
              <div
                className="up-user-container"
                style={{ transform: `translate3d(${position.userInfo})` }}
              >
                <div className="up-user-img-container">
                  <img src={user.userImage} className="up-user-image" alt="" />
                </div>
                <div id="up-user-info" className="up-user-info">
                  <div className="up-user-name">
                    {user.name + " " + user.surname}
                  </div>
                  <div className="up-user-friends">150 Friends</div>
                </div>
              </div>
            </div>

            <div className="up-second-container">
              <div className="up-left-container">
                <UserInfo user={user} />
                <UserPhotos user={user} />
                <UserFriends user={user} />
              </div>
              <div className="up-right-container">
                <NewPost user={currentUser} />

                {posts.map((post, i) => (
                  <PostWithPosition
                    user={user}
                    post={post}
                    position={position}
                    key={post._id}
                    i={i}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
