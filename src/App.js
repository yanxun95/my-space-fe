import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile.jsx";
import CustomiseLayout from "./components/CustomiseLayout.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />} />

          <Route path="/user/:id" exact render={() => <UserProfile />} />
          <Route
            path="/customiseLayout/"
            exact
            render={() => <CustomiseLayout />}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
