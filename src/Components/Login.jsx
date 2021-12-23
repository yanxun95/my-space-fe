import { useState } from "react";
import { Form } from "react-bootstrap";
import { GiConsoleController } from "react-icons/gi";
import "../css/login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const login = async () => {
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
        history.push("/user?id=" + result._id);
        console.log(result);
      } else if (response.status === 401) {
        alert("Email or password is not correct!");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-form">
        <div className="login-title">Login</div>
        <Form>
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
          <div className="btn-login" type="submit" onClick={() => login()}>
            Login
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
