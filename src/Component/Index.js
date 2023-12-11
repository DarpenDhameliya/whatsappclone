import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SocketContext from '../Context';
import Api from "./Api";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

const Index = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Api path="/app" />
        </Switch>
      </Router>
    </>
  );
};

export default Index;
