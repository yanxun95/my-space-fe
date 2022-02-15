import { useEffect, useState } from "react";
import "../css/comments.css";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const currentUser = useSelector((state) => state.user.userInfo);
  const [accessToken, setAccessToken] = useState("");

  const [newComments, setNewComments] = useState({ comment: "" });

  const getCommentsById = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/post/${postId}/comment`
      );
      if (response.ok) {
        let result = await response.json();
        setComments(result);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL +
          `/post/${postId}/${currentUser._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(newComments),
        }
      );
      if (response.ok) {
        getCommentsById();
        document.getElementById("newComment").value = "";
      } else {
        alert("Error");
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
    getCommentsById();
  }, []);

  return (
    <>
      <div className="comments-main-container">
        <div className="comments-border"></div>
        {comments.length !== 0 &&
          comments.map((comment) => (
            <div key={comment._id} className="comments-container">
              <div className="comment-user-image-container">
                <img
                  src={comment.user.userImage}
                  alt=""
                  className="post-user-image"
                />
              </div>
              <div className="comment-user-info-container">
                <div className="comment-username">
                  {comment.user.name + " " + comment.user.surname}
                </div>
                <div>{comment.comment}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="comments-post">
        <div className="comment-user-image-container">
          <img src={currentUser.userImage} alt="" className="post-user-image" />
        </div>

        <Form
          className="comment-new-comment-form"
          onSubmit={(e) => postComment(e)}
        >
          <input
            type="text"
            id="newComment"
            className="comment-new-comment"
            placeholder="Write a comment..."
            onChange={(e) => setNewComments({ comment: e.target.value })}
          ></input>
        </Form>
      </div>
    </>
  );
};
export default Comments;
