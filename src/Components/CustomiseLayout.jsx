import { AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import "../css/customiseLayout.css";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect } from "react";

gsap.registerPlugin(Draggable);

const CustomiseLayout = ({ currentUser }) => {
  const createDrag = () => {
    Draggable.create("#upUserContainer", {
      bounds: document.getElementById("upTopContainer"),
    });
    Draggable.create("#upBgContainer", {
      type: "y",
      bounds: document.getElementById("upTopContainer"),
    });
    Draggable.create("#postFcontainer", {
      bounds: document.getElementById("postContainer"),
    });
    Draggable.create("#postScontainer", {
      bounds: document.getElementById("postContainer"),
    });
    Draggable.create("#post3container", {
      type: "y",
      bounds: document.getElementById("postContainer"),
    });
    Draggable.create("#post4container", {
      bounds: document.getElementById("postContainer"),
    });
  };
  //   let element = document.querySelector(".up-user-container");
  //   let compStyles = window.getComputedStyle(element);
  //   console.log(compStyles.width);

  useEffect(() => {
    createDrag();
  }, []);

  return (
    <div className="cy-main-container">
      <div id="upTopContainer" className="up-top-container">
        <div id="upBgContainer" className="up-bg-container">
          <img src={currentUser.bgImage} className="up-bg-image" alt="" />
        </div>
        <div id="upUserContainer" className="up-user-container">
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
        <div id="postFcontainer" className="post-fcontainer post-fcustomise">
          <div className="post-user-info-container">
            <img
              src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              alt=""
              className="post-user-image"
            />
            <div className="post-user-info">
              <span className="post-username">Username</span>
              <span className="post-time">Post date</span>
            </div>
          </div>
          <BsThreeDots className="post-edit" />
        </div>
        <div id="postScontainer" className="post-scontainer">
          <span>Content</span>
        </div>
        <div id="post3container" className="post-3container">
          <img
            src="https://res.cloudinary.com/dobdsx6ge/image/upload/v1639414127/MySpacePost/b7i3ybikrj3ot7i0ugxv.png"
            alt=""
            className="post-img"
            style={{ opacity: "0.5" }}
          />
        </div>
        <div id="post4container" className="post-4container">
          <div className="post-button">
            <AiOutlineLike className="post-icon-size" />
            <span>Number of likes</span>
          </div>
          <div className="post-function-bar">
            <div className="post-button">
              <AiOutlineLike className="post-icon-size" />
              <span>Like</span>
            </div>
            <div className="post-button">
              <GoComment className="post-icon-size" />
              <span>Comment</span>
            </div>
            <div className="post-button">
              <RiShareForwardLine className="post-icon-size" />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>
      <div className="cy-btn-save">Save</div>
    </div>
  );
};

export default CustomiseLayout;
