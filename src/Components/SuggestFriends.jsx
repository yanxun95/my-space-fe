/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import "../css/suggestFriends.css";
import { useSelector } from "react-redux";

const SuggestFriends = () => {
  const currentUser = useSelector((state) => state.user.userInfo);
  const [friends, setFriends] = useState([]);

  const loadSuggestFriends = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/user/");
      if (response.ok) {
        let result = await response.json();
        let filterResult = result.filter(
          (user) => user._id !== currentUser._id
        );
        filterResult = filterResult.sort(() => Math.random() - 0.5);
        setFriends(filterResult);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSuggestFriends();
  }, []);

  return (
    <div className="sf-container">
      <div className="ud-sec-container">
        <div className="sf-font">Suggest Friends</div>
        {friends.map((friend) => (
          <div key={friend._id} className="ud-btn-with-add-container">
            <div>
              <img src={friend.userImage} alt="" className="ud-user-image " />
              <span>{friend.name + " " + friend.surname}</span>
            </div>
            <AiOutlineUserAdd className="ud-btn-add" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestFriends;
