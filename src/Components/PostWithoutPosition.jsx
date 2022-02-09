import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const PostWithoutPosition = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user.userInfo);
  const [accessToken, setAccessToken] = useState(" ");

  const loadposts = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/post/");
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
        loadposts();
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
    loadposts();
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        posts.map((post) => (
          <div key={post._id} id="post-container" className={`post-container`}>
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
            <div className="post-3container">
              <img src={post.img} alt="" className="post-img" />
            </div>
            <div className="post-4container">
              <div className="post-button">
                <AiOutlineLike className="post-icon-size" />
                <span>{post.likes}</span>
              </div>
              <div className="post-function-bar">
                <div className="post-button" onClick={() => like(post._id)}>
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
        ))
      )}
    </>
  );
};

export default PostWithoutPosition;
