import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { userLogin } from "../actions/userAction";

import TextField from "@material-ui/core/TextField";
import Loader from "./extras/Loader";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.userInfo);
  const { error, loading } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
    return () => dispatch({ type: "CLEAN_ERROR" });
  }, [user, history, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.main}>
          <h1 className={classes.heading}>Log In</h1>
          <div className={classes.container}>
            {error ? <span className={classes.error}>{error}</span> : ""}
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <TextField
                className={classes.textField}
                label="Email or username"
                type="text"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <TextField
                style={{ margin: "20px 0" }}
                className={classes.textField}
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button className={classes.standardBtn} type="submit">
                Log In
              </button>
              <Link
                style={{ textDecoration: "none" }}
                to="/register"
                className={classes.standardBtn}
              >
                Not registered? Sign In
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
