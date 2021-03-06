import "../css/post.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Post from "./Post";

const PostWithoutPosition = ({ posts, loadPost }) => {
  // const [posts, setPosts] = useState([]);

  // const loadPost = async () => {
  //   try {
  //     const response = await fetch(process.env.REACT_APP_BE_URL + "/post/");
  //     if (response.ok) {
  //       let result = await response.json();
  //       setPosts(result.reverse());
  //     } else {
  //       console.log("Error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadPost();
  // }, []);

  return (
    <>
      {posts.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        posts.map((post, i) => (
          <Post
            key={post._id}
            post={post}
            index={i}
            loadPost={() => loadPost()}
          />
        ))
      )}
    </>
  );
};

export default PostWithoutPosition;
