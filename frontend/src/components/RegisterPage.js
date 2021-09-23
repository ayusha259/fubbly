import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { userRegister } from "../actions/userAction";

import classes from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useSelector((state) => state.userInfo);
  const { error, loading } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      userRegister({
        name: name,
        username: username,
        email: email,
        password: confirmPassword,
      })
    );
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
        <h1>LOADING....</h1>
      ) : (
        <div className={classes.main}>
          <h1 className={classes.heading}>Sign In</h1>
          <div className={classes.container}>
            {error ? <span className={classes.error}>{error}</span> : ""}
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <TextField
                style={{ marginBottom: "20px" }}
                className={classes.textField}
                label="Full Name"
                type="text"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <TextField
                style={{ marginBottom: "20px" }}
                className={classes.textField}
                label="Username"
                type="text"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <TextField
                style={{ marginBottom: "20px" }}
                className={classes.textField}
                label="Email"
                type="text"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <TextField
                style={{ marginBottom: "20px" }}
                className={classes.textField}
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <TextField
                style={{ marginBottom: "20px" }}
                error={confirmPassword !== password ? true : false}
                className={classes.textField}
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              <button className={classes.standardBtn} type="submit">
                Sign In
              </button>
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                className={classes.standardBtn}
              >
                Already registered? Log In
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
