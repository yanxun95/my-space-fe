import { AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import "../css/customiseLayout.css";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar.jsx";

gsap.registerPlugin(Draggable);

const CustomiseLayout = ({ currentUser }) => {
  const [position, setPosition] = useState({});
  const [accessToken, setAccessToken] = useState(" ");

  const loadPosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/customise/" + currentUser._id,
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
          body: JSON.stringify(position),
        }
      );
      if (response.ok) {
        alert("Customise layout has been safe!");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createDrag = () => {
    Draggable.create(".up-user-container", {
      bounds: document.getElementById("upTopContainer"),
      onDragEnd: function () {
        console.log(position._id);
        setPosition({ ...position, userInfo: `${this.x}px, ${this.y}px, 0px` });
      },
    });
    Draggable.create(".up-bg-container", {
      type: "y",
      zIndexBoost: false,
      bounds: document.getElementById("upTopContainer"),
      onDragEnd: function () {
        setPosition({ ...position, userBgImage: `0px, ${this.y}px, 0px` });
      },
    });
    Draggable.create(".post-fcontainer", {
      type: "y",
      bounds: document.getElementById("postContainer"),
      onDragEnd: function () {
        setPosition({ ...position, postUserInfo: `0px, ${this.y}px, 0px` });
      },
    });
    Draggable.create(".post-scontainer", {
      type: "y",
      bounds: document.getElementById("postContainer"),
      onDragEnd: function () {
        setPosition({ ...position, postUserContent: `0px, ${this.y}px, 0px` });
      },
    });
    Draggable.create(".post-3container", {
      type: "y",
      bounds: document.getElementById("postContainer"),
      zIndexBoost: false,
      onDragEnd: function () {
        setPosition({ ...position, postUserImage: `0px, ${this.y}px, 0px` });
      },
    });
    Draggable.create(".post-4container", {
      type: "y",
      bounds: document.getElementById("postContainer"),
      onDragEnd: function () {
        setPosition({
          ...position,
          postUserFunctionBar: `0px, ${this.y}px, 0px`,
        });
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
    createDrag();
  }, [position]);

  return (
    <>
      <TopNavbar currentUser={currentUser} />
      <div className="cy-main-container">
        <div id="upTopContainer" className="up-top-container">
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
                src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                className="up-user-image"
                alt=""
              />
            </div>
            <div className="up-user-info">
              <div className="up-user-name">Username</div>
              <div className="up-user-friends">Number of friends</div>
            </div>
          </div>
        </div>
        <div id="postContainer" className="post-container">
          <div
            className="post-fcontainer post-fcustomise"
            style={{
              zIndex: "1",
              transform: `translate3d(${position.postUserInfo})`,
            }}
          >
            <div className="post-user-info-container">
              <img
                src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                alt=""
                className="post-user-image-customise"
              />
              <div className="post-user-info">
                <span className="post-username-customise">Username</span>
                <span className="post-time-customise">Post date</span>
              </div>
            </div>
            <BsThreeDots className="post-edit" />
          </div>
          <div
            className="post-scontainer"
            style={{
              zIndex: "1",
              transform: `translate3d(${position.postUserContent})`,
            }}
          >
            <span>Content</span>
          </div>
          <div
            className="post-3container"
            style={{
              transform: `translate3d(${position.postUserImage})`,
            }}
          >
            <img
              src="https://res.cloudinary.com/dobdsx6ge/image/upload/v1639750640/MySpacePost/dkgh20aqosaxwbpbrav1.png"
              alt=""
              className="post-img"
            />
          </div>
          <div
            className="post-4container"
            style={{
              zIndex: "1",
              transform: `translate3d(${position.postUserFunctionBar})`,
            }}
          >
            <div className="post-button-customise">
              <AiOutlineLike className="post-icon-size" />
              <span>Number of likes</span>
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
        <div className="cy-btn-save" onClick={() => savePosition()}>
          Save
        </div>
      </div>
    </>
  );
};

export default CustomiseLayout;
