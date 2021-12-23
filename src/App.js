import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavbar from "./components/TopNavbar.jsx";
import { useState, useEffect } from "react";
import UserProfile from "./components/UserProfile.jsx";
import CustomiseLayout from "./components/CustomiseLayout.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/user/" + process.env.REACT_APP_USERID
      );
      if (response.ok) {
        let result = await response.json();
        setCurrentUser(result);
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
      {currentUser !== null && (
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Login />} />

            <Route path="/user" exact render={() => <UserProfile />} />
            <Route
              path="/customiseLayout/"
              exact
              render={() => <CustomiseLayout currentUser={currentUser} />}
            />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
