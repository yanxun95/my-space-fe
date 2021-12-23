import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const Post = ({ currentUser, post }) => {
  const [position, setPosition] = useState({});
  const [accessToken, setAccessToken] = useState(" ");
  const postDate = post.createdAt.split("T");

  const loadPosition = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/customise/${currentUser._id}`,
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

  useEffect(() => {
    getToken();
    if (accessToken !== " " && currentUser !== undefined) {
      loadPosition();
    }
  }, [accessToken, currentUser]);

  return (
    <div id="post-container" className="post-container">
      <div
        className="post-fcontainer"
        style={{
          zIndex: "1",
          transform: `translate3d(${position.postUserInfo})`,
        }}
      >
        <div className="post-user-info-container">
          <img src={currentUser.userImage} alt="" className="post-user-image" />
          <div className="post-user-info">
            <span className="post-username">
              {currentUser.name + " " + currentUser.surname}
            </span>
            <span className="post-time">{postDate[0]}</span>
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
        <span>{post.content}</span>
      </div>
      <div
        className="post-3container"
        style={{
          transform: `translate3d(${position.postUserImage})`,
        }}
      >
        <img src={post.img} alt="" className="post-img" />
      </div>
      <div
        className="post-4container"
        style={{
          zIndex: "1",
          transform: `translate3d(${position.postUserFunctionBar})`,
        }}
      >
        <div className="post-button">
          <AiOutlineLike className="post-icon-size" />
          <span>{post.likes}</span>
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
  );
};

export default Post;
