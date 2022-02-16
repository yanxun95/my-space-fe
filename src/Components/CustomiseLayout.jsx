/* eslint-disable react-hooks/exhaustive-deps */
import { AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine, RiUnderline } from "react-icons/ri";
import "../css/customiseLayout.css";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import UserFriends from "./UserFriends";
import UserPhotos from "./UserPhotos";
import UserInfo from "./UserInfo";
import NewPost from "./NewPost";
import Sortable from "sortablejs";
import {
  updateMainPosition,
  setPosition,
  updateUserInfoPosition,
  updatePostPosition,
  updateUserBgPosition,
  updateUpLeftContainerPosition,
} from "../actions";
import { useHistory } from "react-router-dom";
gsap.registerPlugin(Draggable);

const CustomiseLayout = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(" ");
  const currentUser = useSelector((state) => state.user.userInfo);
  const getUpdatePosition = useSelector((state) => state.user.position);
  const [post, setPost] = useState(undefined);
  const history = useHistory();

  const emptyPosition = {
    _id: getUpdatePosition._id,
    userId: getUpdatePosition.userId,
    userInfo: "0px, 0px, 0px",
    userBgImage: "0px, 0px, 0px",
    mainPosition: " ",
    postPosition: " ",
    upLeftContainerPosition: " ",
  };

  const loadPosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise/" + currentUser._id
      );
      if (response.ok) {
        let result = await response.json();
        let posObj = {
          _id: result[0]._id,
          userId: result[0].userId,
          mainPosition: result[0].mainPosition,
          postPosition: result[0].postPosition,
          upLeftContainerPosition: result[0].upLeftContainerPosition,
          userInfo: result[0].userInfo,
          userBgImage: result[0].userBgImage,
        };
        dispatch(setPosition(posObj));
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/post/user/" + currentUser._id
      );
      if (response.ok) {
        let result = await response.json();
        setPost(result[0]);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const savePosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(getUpdatePosition),
        }
      );
      if (response.ok) {
        alert("Customise layout has been save!");
        window.location.reload();
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(emptyPosition),
        }
      );
      if (response.ok) {
        alert("Layout has been reset!");
        //check the refresh
        // window.location.reload(true);
        history.push(`/user/${currentUser._id}`);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUserInfoDrag = () => {
    Draggable.create(".up-user-container", {
      bounds: document.getElementById("upTopContainer"),
      onDragEnd: function () {
        dispatch(updateUserInfoPosition(`${this.x}px, ${this.y}px, 0px`));
      },
    });

    Draggable.create(".up-bg-container", {
      type: "y",
      bounds: document.getElementById("upTopContainer"),
      onDragEnd: function () {
        dispatch(updateUserBgPosition(`0px, ${this.y}px, 0px`));
      },
    });
  };

  const createDrag = () => {
    let mainContainer = document.querySelector(".up-second-container");
    let postContainer = document.querySelector(".post-container");
    let leftContainer = document.querySelector(".up-left-container");
    Sortable.create(mainContainer, {
      group: "mainContainer",
      store: {
        get: function (sortable) {
          let order = getUpdatePosition.mainPosition;
          return order ? order.split("|") : [];
        },

        set: function (sortable) {
          let order = sortable.toArray();
          dispatch(updateMainPosition(order.join("|")));
          console.log(order);
        },
      },
    });

    Sortable.create(postContainer, {
      group: "postContainer",
      store: {
        get: function (sortable) {
          let order = getUpdatePosition.postPosition;
          return order ? order.split("|") : [];
        },

        set: function (sortable) {
          let order = sortable.toArray();
          dispatch(updatePostPosition(order.join("|")));
        },
      },
    });

    Sortable.create(leftContainer, {
      group: "leftContainer",
      store: {
        get: function (sortable) {
          let order = getUpdatePosition.upLeftContainerPosition;
          return order ? order.split("|") : [];
        },
        set: function (sortable) {
          let order = sortable.toArray();
          dispatch(updateUpLeftContainerPosition(order.join("|")));
        },
      },
    });
  };

  const getToken = () => {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("=");
    setAccessToken(cArr[1]);
  };

  useEffect(() => {
    getToken();
    if (accessToken !== " ") {
      loadPosition();
    }
  }, [accessToken]);

  useEffect(() => {
    if (post !== undefined && getUpdatePosition.mainPosition !== undefined) {
      createUserInfoDrag();
      createDrag();
    }
  }, [post, getUpdatePosition]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {getUpdatePosition !== {} && (
        <>
          <TopNavbar />
          <div className="cy-main-container">
            <div id="upTopContainer" className="up-top-container">
              <div
                className="up-bg-container"
                style={{
                  transform: `translate3d(${getUpdatePosition.userBgImage})`,
                }}
              >
                <img src={currentUser.bgImage} className="up-bg-image" alt="" />
              </div>
              <div
                className="up-user-container"
                style={{
                  transform: `translate3d(${getUpdatePosition.userInfo})`,
                }}
              >
                <div className="up-user-img-container">
                  <img
                    src={currentUser.userImage}
                    className="up-user-image"
                    alt=""
                  />
                </div>
                <div className="up-user-info">
                  <div className="up-user-name">
                    {currentUser.name + " " + currentUser.surname}
                  </div>
                  <div className="up-user-friends">Number of friends</div>
                </div>
              </div>
            </div>
            <div className="up-second-container">
              <div className="up-left-container">
                <UserInfo user={currentUser} />
                <UserPhotos user={currentUser} />
                <UserFriends user={currentUser} />
              </div>
              <div className="up-right-container">
                {post !== undefined && (
                  <div>
                    <NewPost user={currentUser} />
                    <div id="postContainer" className="post-container">
                      <div className="post-fcontainer">
                        <div className="post-user-info-container">
                          <img
                            src={currentUser.userImage}
                            alt=""
                            className="post-user-image"
                          />

                          <div className="post-user-info">
                            <span className="post-username-customise">
                              {currentUser.name + " " + currentUser.surname}
                            </span>
                            <span className="post-time-customise">
                              {post.createdAt.split("T")[0]}
                            </span>
                          </div>
                        </div>
                        <BsThreeDots className="post-edit" />
                      </div>
                      <div className="post-scontainer">
                        <span>{post.content}</span>
                      </div>
                      <div className="post-3container">
                        <img src={post.img} alt="" className="post-img" />
                      </div>
                      <div className="post-4container">
                        <div className="post-button-customise">
                          <AiOutlineLike className="post-icon-size" />
                          <span className="post-like-no-font">
                            {post.likes}
                          </span>
                        </div>
                        <div className="post-function-bar-customise">
                          <div className="post-button-customise">
                            <AiOutlineLike className="post-icon-size" />
                            <span>Like</span>
                          </div>
                          <div className="post-button-customise">
                            <GoComment className="post-icon-size" />
                            <span>Comment</span>
                          </div>
                          <div className="post-button-customise">
                            <RiShareForwardLine className="post-icon-size" />
                            <span>Share</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="cy-btn-save" onClick={() => savePosition()}>
              Save
            </div>
            <div className="cy-btn-save" onClick={() => resetPosition()}>
              Reset
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomiseLayout;
