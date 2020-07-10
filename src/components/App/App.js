import React, { useState, useEffect } from "react";
import "./styles.css";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../Login/Login";
import Productos from "../Productos/Productos";
import Clientas from "../Clientas/clientas";
import Dashboard from "../Dashboard/DashBoard";
import { CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "../firebase";

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/productos" component={Productos} />
        <Route exact path="/clientas" component={Clientas} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
