import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import PostModal from "./PostModal.jsx";
import Sortable from "sortablejs";
import { GiConsoleController } from "react-icons/gi";

const Post = ({ user, post, position, i }) => {
  const [accessToken, setAccessToken] = useState(" ");
  const postDate = post.createdAt.split("T");
  const [modalShow, setModalShow] = useState(false);

  const getPossition = () => {
    let postContainer = document.querySelector(`.post-container.post${i}`);
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

  const getToken = () => {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("=");
    setAccessToken(cArr[1]);
  };

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user]);

  useEffect(() => {
    getPossition();
  }, [position, user]);

  return (
    <>
      {position !== null && (
        <>
          <div id="post-container" className={`post-container post${i}`}>
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
            <div className="post-3container">
              <img src={post.img} alt="" className="post-img" />
            </div>
            <div className="post-4container">
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

          {/* <PostModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        </>
      )}
    </>
  );
};

export default Post;
