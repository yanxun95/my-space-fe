import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/login.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const btnUserLogin = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(process.env.REACT_APP_BE_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        let result = await response.json();
        dispatch(userLogin(result));
        history.push("/homepage/");
      } else if (response.status === 401) {
        alert("Email or password is not correct!");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userSignUp = () => {
    history.push("/signup/");
  };

  return (
    <div className="login-main-container">
      <div className="login-form">
        <div className="login-title">Login</div>
        <Form onSubmit={(e) => btnUserLogin(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-form-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="login-input"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="login-input"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </Form.Group>
          <Button className="btn-login" type="submit">
            Login
          </Button>
          <Button
            className="btn-login"
            type="button"
            onClick={() => userSignUp()}
          >
            Create new account
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
