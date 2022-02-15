/* eslint-disable react-hooks/exhaustive-deps */
import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Comments from "./Comments";

const Post = ({ post, index, loadPost }) => {
  const currentUser = useSelector((state) => state.user.userInfo);
  const [showComment, setShowComment] = useState(false);
  const [accessToken, setAccessToken] = useState(" ");
  const [isLiked, setIsLiked] = useState(false);

  const like = async (postId) => {
    setIsLiked(!isLiked);
    const userId = { userId: currentUser._id };
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/post/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(userId),
        }
      );
      if (response.ok) {
        loadPost();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkLiked = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/like/${post._id}/${currentUser._id}`
      );
      if (response.ok) {
        let result = await response.json();
        setIsLiked(result);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likedPost = () => {
    const btnLike = document.getElementById(`postLikeLogo${index}`);

    if (isLiked) {
      btnLike.classList.add("post-liked");
    } else {
      btnLike.classList.remove("post-liked");
    }
  };

  const displayComments = () => {
    setShowComment(!showComment);
  };

  const getToken = () => {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("=");
    setAccessToken(cArr[1]);
  };

  useEffect(() => {
    getToken();
    checkLiked();
    likedPost();
  }, []);

  useEffect(() => {
    likedPost();
  }, [isLiked]);

  return (
    <>
      {post !== undefined && (
        <div id="post-container" className="post-container">
          <div className="post-fcontainer">
            <div className="post-user-info-container">
              <img
                src={post.user.userImage}
                alt=""
                className="post-user-image"
              />
              <div className="post-user-info">
                <span className="post-username">
                  {post.user.name + " " + post.user.surname}
                </span>
                <span className="post-time">
                  {post.createdAt.split("T")[0]}
                </span>
              </div>
            </div>
            <BsThreeDots className="post-edit" />
          </div>
          <div className="post-scontainer">
            <span>{post.content}</span>
          </div>
          {post.img.length !== 0 ? (
            <div className="post-3container">
              <img src={post.img} alt="" className="post-img" />
            </div>
          ) : (
            <></>
          )}

          <div className="post-4container">
            <div id={`postLikeLogo${index}`} className="post-button">
              <AiOutlineLike className="post-icon-size" />
              <span>{post.likes}</span>
            </div>
            <div className="post-function-bar">
              <div className="post-button" onClick={() => like(post._id)}>
                <AiOutlineLike className="post-icon-size" />
                <span>Like</span>
              </div>
              <div className="post-button" onClick={() => displayComments()}>
                <GoComment className="post-icon-size" />
                <span>Comment</span>
              </div>
              <div className="post-button">
                <RiShareForwardLine className="post-icon-size" />
                <span>Share</span>
              </div>
            </div>
          </div>
          {showComment === true && <Comments postId={post._id} />}
        </div>
      )}
    </>
  );
};

export default Post;
