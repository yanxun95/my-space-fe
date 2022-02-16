/* eslint-disable react-hooks/exhaustive-deps */
import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import PostModal from "./PostModal.jsx";
import Sortable from "sortablejs";
import { GiConsoleController } from "react-icons/gi";
import { useSelector } from "react-redux";

const UserProfilePost = ({ user, post, position, index }) => {
  const [accessToken, setAccessToken] = useState(" ");
  const postDate = post.createdAt.split("T");
  const currentUser = useSelector((state) => state.user.userInfo);

  const [modalShow, setModalShow] = useState(false);

  const getPossition = () => {
    let postContainer = document.getElementById(`post-container${index}`);
    let sortable = Sortable.create(postContainer, {
      group: "postContainer",
      store: {
        get: function (sortable) {
          let order = position.postPosition;
          return order ? order.split("|") : [];
        },
      },
    });
    let state = sortable.option("disabled");
    sortable.option("disabled", !state);
  };

  const like = async (postId) => {
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
      } else {
        console.log("error");
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
  }, [accessToken, user]);

  useEffect(() => {
    getPossition();
  }, [position, user]);

  return (
    <>
      {position !== null && (
        <>
          <div id={`post-container${index}`} className="post-container">
            <div className="post-fcontainer">
              <div className="post-user-info-container">
                <img src={user.userImage} alt="" className="post-user-image" />
                <div className="post-user-info">
                  <span className="post-username">
                    {user.name + " " + user.surname}
                  </span>
                  <span className="post-time">{postDate[0]}</span>
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
              <div className="post-button">
                <AiOutlineLike className="post-icon-size" />
                <span className="post-like-no-font">{post.likes}</span>
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

          {/* <PostModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        </>
      )}
    </>
  );
};

export default UserProfilePost;
