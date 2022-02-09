import "../css/userSmallDashboard.css";
import { useSelector } from "react-redux";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { IoIosBookmark } from "react-icons/io";
import { RiSettings5Fill } from "react-icons/ri";

const UserSmallDashboard = () => {
  const currentUser = useSelector((state) => state.user.userInfo);

  return (
    <div className="ud-container" style={{ marginRight: "1rem" }}>
      <div className="ud-sec-container">
        <div className="ud-btn">
          <img src={currentUser.userImage} alt="" className="ud-user-image " />
          <span>{currentUser.name + " " + currentUser.surname}</span>
        </div>
        <div className="ud-btn">
          <AiFillHome className="ud-logo" />
          <span>Home</span>
        </div>
        <div className="ud-btn">
          <AiFillMessage className="ud-logo" />
          <span>Messages</span>
        </div>
        <div className="ud-btn">
          <IoIosBookmark className="ud-logo" />
          <span>Saved</span>
        </div>
        <div className="ud-btn">
          <RiSettings5Fill className="ud-logo" />
          <span>Settings</span>
        </div>
      </div>
      <div className="ud-terms">
        <span>Privacy</span>
        <span> · </span>
        <span>Terms</span>
        <span> · </span>
        <span>Advertising</span>
        <span> · </span>
        <span>Ad choices</span>
        <span> · </span>
        <span>Cookies</span>
        <span> · · </span>
        <span>My Space © 2022</span>
      </div>
    </div>
  );
};

export default UserSmallDashboard;
