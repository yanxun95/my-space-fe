import "../css/topNavbar.css";
import "../css/userProfile.css";
import { MdWorkspacesOutline } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Form } from "react-bootstrap";
import {
  MdArrowDropDownCircle,
  MdOutlineArrowDropDownCircle,
} from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNavbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.userInfo);

  const btnDropdown = () => {
    setDropdown(false);
    if (dropdown === false) {
      const btnDropdown = document.querySelector(".btn-dw-customise");
      btnDropdown.classList.add("btn-dropdown-display");
      setDropdown(!dropdown);
    } else {
      const btnDropdown = document.querySelector(".btn-dw-customise");
      btnDropdown.classList.remove("btn-dropdown-display");
      setDropdown(!dropdown);
    }
  };

  const btnProfileImg = () => {
    history.push("/user/" + currentUser._id);
    // window.location.reload(true);
  };
  return (
    <div className="top-navbar">
      <div className="top-navbar-left">
        <div>
          <Link to={`/homepage/`}>
            <MdWorkspacesOutline className="logo" />
          </Link>
        </div>

        <div className="search-bar">
          <BiSearch />
          <Form>
            <Form.Group
              className="d-flex"
              style={{ alignItems: "center" }}
              controlId="searchBar"
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-field"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="top-navbar-right">
        <div className="profile-info" onClick={() => btnProfileImg()}>
          <div className="profile-img-container">
            <img
              src={currentUser.userImage}
              className="profile-img"
              alt=""
            ></img>
          </div>
          <div className="profile-name">
            {currentUser.name + " " + currentUser.surname}
          </div>
        </div>
        <div className="btn-dropdown-container">
          <MdOutlineArrowDropDownCircle
            className="btn-dropdown"
            onClick={() => btnDropdown()}
          />
          <div className="btn-dw-customise">
            <div
              className="btn-dw-user-profile"
              onClick={() => btnProfileImg()}
            >
              <div>
                <img
                  src={currentUser.userImage}
                  className="btn-dw-profile-img"
                  alt=""
                />
              </div>
              <div className="btn-dw-profile-info">
                <div className="btn-dw-profile-name">
                  {currentUser.name + " " + currentUser.surname}
                </div>
                <div className="btn-dw-profile-see-profile">
                  See your profile
                </div>
              </div>
            </div>
            <hr className="btn-dw-hr"></hr>
            <Link to={`/customiseLayout/`}>
              <div className="btn-dw-list">
                <div className="btn-dw-list-icon-container">
                  <RiSettings5Fill className="btn-dw-list-icon" />
                </div>
                <div className="btn-dw-list-text">Customise profile</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
