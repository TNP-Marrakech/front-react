import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Question from "./pages/question/Question.jsx"
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Revise from "./pages/revise/Revise"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";



function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger/>}
        </Route>
        <Route path="/revision">
          {!user ? <Redirect to="/" /> : <Revise/>}
        </Route>
        <Route path="/profile/:username">
          {!user ? <Redirect to="/" /> : <Profile />}
        </Route>
        <Route path="/questions/:username">
          {!user ? <Redirect to="/" /> : <Question />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
