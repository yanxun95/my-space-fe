import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Post from "./Post";

const PostWithoutPosition = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user.userInfo);
  const [accessToken, setAccessToken] = useState(" ");
  const [showComment, setShowComment] = useState(false);

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
        posts.map((post, i) => <Post key={post._id} post={post} index={i} />)
      )}
    </>
  );
};

export default PostWithoutPosition;
