import "../css/userProfile.css";
import UserFriends from "./UserFriends.jsx";
import UserInfo from "./UserInfo.jsx";
import UserPhotos from "./UserPhotos.jsx";
import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";
import { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sortable from "sortablejs";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user.userInfo);
  const [position, setPosition] = useState({});
  const [accessToken, setAccessToken] = useState(" ");
  const { id } = useParams();

  const loadPosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise/" + id,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (response.ok) {
        let result = await response.json();
        console.log("resutl", result);
        setPosition(result[0]);
        console.log("resut2", position);
        createDrag();
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

  const createDrag = () => {
    console.log("order:", position);
    let mainContainer = document.querySelector(".up-second-container");
    Sortable.create(mainContainer, {
      group: "mainContainer",
      store: {
        get: function (sortable) {
          var order = position.mainPosition;

          return order ? order.split("|") : [];
        },
      },
    });
    // var state = sortable.option("disabled");
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getToken();
    if (accessToken !== " ") {
      loadPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <>
      {position !== null && (
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
      )}
    </>
  );
};

export default UserProfile;
