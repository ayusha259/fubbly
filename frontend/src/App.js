import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
