import "../css/userInfo.css";
import { BsThreeDots, BsFillHouseDoorFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmail, MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

const UserInfo = ({ currentUser }) => {
  return (
    <div className="user-info-main-container">
      <div className="user-info-fcontainer">
        <span>Info</span>
        <BsThreeDots className="user-info-menu" />
      </div>
      <div className="user-info-scontainer">
        <div className="user-info-scontainer-details">
          <BsFillHouseDoorFill />
          <span>{currentUser.location}</span>
        </div>
        <div className="user-info-scontainer-details">
          <FaBirthdayCake />
          <span>{currentUser.dob}</span>
        </div>
        <div className="user-info-scontainer-details">
          <MdEmail />
          <span>{currentUser.email}</span>
        </div>
        <div className="user-info-scontainer-details">
          <GiGraduateCap />
          <span>{currentUser.education}</span>
        </div>
        <div className="user-info-scontainer-details">
          <MdWork />
          <span>{currentUser.work}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
