import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile.jsx";
import CustomiseLayout from "./components/CustomiseLayout.jsx";
import Login from "./components/Login.jsx";
import Homepage from "./components/Homapage";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="main-container">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />} />
          <Route path="/signup/" exact render={() => <SignUp />} />
          <Route path="/homepage/" exact render={() => <Homepage />} />
          <Route path="/user/:id" exact render={() => <UserProfile />} />
          <Route
            path="/customiseLayout/"
            exact
            render={() => <CustomiseLayout />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
