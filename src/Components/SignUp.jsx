/* eslint-disable react-hooks/exhaustive-deps */
import "../css/signUp.css";
import { MdWorkspacesOutline } from "react-icons/md";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [allDays, setAllDays] = useState([]);
  const [years, setYears] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const [signUpInfo, setSignUpInto] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    dob: "",
  });

  const [dob, setDob] = useState({
    date: "",
    month: "",
    year: "",
  });

  const createAllDays = () => {
    let allDaysArray = [];
    for (let i = 1; i <= 31; i++) {
      allDaysArray.push(i);
    }
    setAllDays(allDaysArray);
  };

  const createYears = () => {
    let yearsArray = [];
    for (let i = year; i > year - 100; i--) {
      yearsArray.push(i);
    }
    setYears(yearsArray);
  };

  const defaultDob = () => {
    setDob({ date: "1", month: "Jan", year: year });
  };

  const updataInfo = () => {
    setSignUpInto({
      ...signUpInfo,
      dob: dob.date + " " + dob.month + " " + dob.year,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpInfo),
        }
      );
      if (response.ok) {
        alert("New account has been create!");
        history.push("/");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createAllDays();
    createYears();
    defaultDob();
  }, []);

  useEffect(() => {
    updataInfo();
  }, [dob]);

  return (
    <div className="sp-main-container">
      <div className="signup-form">
        <div className="sp-title">Sign Up</div>
        <Form onSubmit={(e) => registerUser(e)}>
          <div className="sp-form-small-container">
            <Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Control
                  type="firstName"
                  placeholder="First name"
                  onChange={(e) =>
                    setSignUpInto({ ...signUpInfo, name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Control
                  type="lastName"
                  placeholder="Last name"
                  onChange={(e) =>
                    setSignUpInto({ ...signUpInfo, surname: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Row>
          </div>
          <div className="sp-form-small-container">
            <Form.Group controlId="formGridEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignUpInto({ ...signUpInfo, email: e.target.value })
                }
                required
              />
            </Form.Group>
          </div>
          <div className="sp-form-small-container">
            <Form.Group controlId="formGridPassword">
              <Form.Control
                type="password"
                placeholder="New password"
                onChange={(e) =>
                  setSignUpInto({ ...signUpInfo, password: e.target.value })
                }
                required
              />
            </Form.Group>
          </div>

          <div className="sp-birthday-font">Birthday</div>

          <Row>
            <Form.Group as={Col} controlId="formDays">
              <Form.Control
                as="select"
                defaultValue="1"
                onChange={(e) => setDob({ ...dob, date: e.target.value })}
                required
              >
                {allDays.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formMonths">
              <Form.Control
                as="select"
                defaultValue="Jan"
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
                required
              >
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Sep</option>
                <option>Oct</option>
                <option>Nov</option>
                <option>Dec</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formYears">
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
                required
              >
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <div className="sp-terms">
            By clicking Sign Up, you agree to our Terms. Learn how we collect,
            use and share your data in our Data Policy and how we use cookies
            and similar technology in our Cookies Policy.
          </div>
          <div className="sp-btn-submit-container">
            <Button
              variant="primary"
              type="submit"
              className="sp-btn-submit"
              // onClick={() => registerUser()}
            >
              Sign up
            </Button>
          </div>
        </Form>
        {/* <div>Join with google</div> */}
      </div>
    </div>
  );
};
export default SignUp;
