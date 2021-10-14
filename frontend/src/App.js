import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";

// import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Switch key={location.key} location={location}>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          {/* <ProtectedRoute exact path="/profile" component={ProfilePage} /> */}
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
