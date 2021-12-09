import "../Css/topNavbar.css";
import { MdWorkspacesOutline } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Form } from "react-bootstrap";
import {
  MdArrowDropDownCircle,
  MdOutlineArrowDropDownCircle,
} from "react-icons/md";

const TopNavbar = ({ currentUser }) => {
  return (
    <>
      {currentUser !== null && (
        <div className="top-navbar">
          <div className="top-navbar-left">
            <div>
              <MdWorkspacesOutline className="logo" />
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
            <div className="profile-info">
              <div className="profile-img-container">
                <img
                  src={currentUser.image}
                  className="profile-img"
                  alt=""
                ></img>
              </div>
              <div className="profile-name">
                {currentUser.name + " " + currentUser.surname}
              </div>
            </div>
            <div>
              <MdOutlineArrowDropDownCircle className="btn-dropdown" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
