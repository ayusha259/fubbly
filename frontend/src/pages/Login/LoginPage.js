import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent/LoginComponent";
import RegisterComponent from "./RegisterComponent/RegisterComponent";
import "./LoginPage.scss";

const LoginPage = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
    return () => dispatch({ type: "CLEAN_ERROR" });
  }, [user, history, dispatch]);
  return (
    <>
      <div className="loginContainer">
        <div className="imgContainer">
          <img
            src="https://images.unsplash.com/photo-1541542509806-6371b7b0a265?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1957&q=80"
            alt=""
          />
        </div>
        <div className="login-content-container">
          <Route key={1} path="/login" exact component={LoginComponent} />
          <Route
            key={2}
            path="/login/register"
            exact
            component={RegisterComponent}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
