import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";

const Post = ({ currentUser, post }) => {
  const postDate = post.createdAt.split("T");

  return (
    <div id="post-container" className="post-container">
      <div className="post-fcontainer">
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
  );
};

export default Post;
