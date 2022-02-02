import "../css/newPost.css";
import { MdInsertPhoto } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";

const NewPost = ({ user }) => {
  return (
    <div className="new-post-container">
      <div className="new-post-fcontainer">
        <img src={user.userImage} alt="" className="new-post-user-image" />
        <div className="new-post">Write a post</div>
      </div>
      <div className="new-post-scontainer">
        <div className="new-post-btn-container">
          <MdInsertPhoto className="new-post-icon" />
        </div>
        <div className="new-post-btn-container">
          <IoVideocam className="new-post-icon" />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
