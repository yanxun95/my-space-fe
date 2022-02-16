import "../css/newPost.css";
import { MdInsertPhoto } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const NewPost = ({ post, loadPost }) => {
  const currentUser = useSelector((state) => state.user.userInfo);
  const [show, setShow] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [newPost, setNewPost] = useState({ content: "" });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postNewPost = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/post/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(newPost),
        }
      );
      if (response.ok) {
        alert("Post has been post.");
        handleClose();
        loadPost();
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
  }, []);

  return (
    <>
      <div className="new-post-container">
        <div className="new-post-fcontainer">
          <img
            src={currentUser.userImage}
            alt=""
            className="new-post-user-image"
          />
          <div className="new-post" onClick={() => handleShow()}>
            Write a post
          </div>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="new-post-modal-title">
            <span>Create post</span>
            <div className="new-post-modal-btn-close" onClick={handleClose}>
              <IoMdClose />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="new-post-modal-body">
            <div className="post-user-info-container">
              <img
                src={currentUser.userImage}
                alt=""
                className="post-user-image"
              />
              <div className="post-user-info">
                <span className="post-username">
                  {currentUser.name + " " + currentUser.surname}
                </span>
              </div>
            </div>
            <Form className="new-post-form">
              <textarea
                type="test"
                id="newPostArea"
                className="post-new-post"
                placeholder={`What's on your mind, ${currentUser.name}?`}
                rows="3"
                onChange={(e) => setNewPost({ content: e.target.value })}
              ></textarea>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="new-post-btn-post" onClick={() => postNewPost()}>
            Post
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewPost;
