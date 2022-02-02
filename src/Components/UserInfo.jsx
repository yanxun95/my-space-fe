import "../css/userInfo.css";
import { BsThreeDots, BsFillHouseDoorFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmail, MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info-main-container">
      <div className="user-info-fcontainer">
        <span>Info</span>
        <BsThreeDots className="user-info-menu" />
      </div>
      <div className="user-info-scontainer">
        <div className="user-info-scontainer-details">
          <BsFillHouseDoorFill />
          <span>{user.location}</span>
        </div>
        <div className="user-info-scontainer-details">
          <FaBirthdayCake />
          <span>{user.dob}</span>
        </div>
        <div className="user-info-scontainer-details">
          <MdEmail />
          <span>{user.email}</span>
        </div>
        <div className="user-info-scontainer-details">
          <GiGraduateCap />
          <span>{user.education}</span>
        </div>
        <div className="user-info-scontainer-details">
          <MdWork />
          <span>{user.work}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
