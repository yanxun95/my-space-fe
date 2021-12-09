import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavbar from "./Components/TopNavbar";
import { useState, useEffect } from "react";
import UserProfile from "./Components/UserProfile.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/user/61b0a4ad35d83a01f09db0bb"
      );
      if (response.ok) {
        let result = await response.json();
        console.log(result);
        setCurrentUser(result);
        console.log("current user:", currentUser);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <Router>
        <TopNavbar currentUser={currentUser} />
      </Router>
    </>
  );
}

export default App;
