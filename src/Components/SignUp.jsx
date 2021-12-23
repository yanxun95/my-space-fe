import "../css/login.css";
import { MdWorkspacesOutline } from "react-icons/md";

const SignUp = () => {
  return (
    <div className="login-bg">
      <div className="login-main-container">
        <div className="login-logo">
          <MdWorkspacesOutline />
          <span>My Space</span>
        </div>
        <div className="login-second-container">
          <div>Email</div>
          <div>Password</div>
          <div>Password</div>
          <div>
            By clicking Sign Up button, you agree to the My Space User
            Agreement, Privacy Policy, and Cookie Policy.
          </div>
          <div>Sign Up</div>
          <div>or</div>
          <div>Join with google</div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
