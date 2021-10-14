import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { userRegister } from "../../../actions/userAction";
import { Power3 } from "gsap";
import "./RegisterComponent.scss";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showLink, setShowLink] = useState(false);
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useSelector((state) => state.userInfo);
  const { error } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      userRegister({
        name: name,
        username: username,
        email: email,
        password: password,
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
    <motion.div
      onAnimationComplete={() => setShowLink(true)}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 1, ease: Power3.easeInOut }}
      className="register-content"
    >
      <h1 id="register-heading">Register to Fubbly</h1>
      <form onSubmit={handleSubmit} className="formContainer">
        {error ? <span className="register-error">{error}</span> : ""}
        <div className="username-row">
          <div className="input-container">
            <label className="inputs-label" htmlFor="name">
              Full Name
            </label>
            <input
              name="name"
              className="textField"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="input-container">
            <label className="inputs-label" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              className="textField"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label className="inputs-label" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            className="textField"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input-container">
          <label className="inputs-label" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            className="textField"
            type={!showPass ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span id="show-pass" onClick={() => setShowPass(!showPass)}>
            {!showPass ? (
              <i className="fas fa-eye"></i>
            ) : (
              <i class="fas fa-eye-slash"></i>
            )}
          </span>
        </div>
        <button className="standardBtnLogin" type="submit">
          Create Account
        </button>
        {showLink ? (
          <span id="register-link">
            Already registered?{" "}
            <Link
              onClick={() => setShowLink(false)}
              style={{ textDecoration: "none" }}
              to="/login"
            >
              Log In
            </Link>
          </span>
        ) : (
          ""
        )}
      </form>
    </motion.div>
  );
};

export default RegisterComponent;
