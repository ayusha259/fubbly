import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Power3 } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../../actions/userAction";
import "./LoginComponent.scss";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const { error } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(userLogin(email, password));
  };
  return (
    <motion.div
      onAnimationComplete={() => setShowLink(true)}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 1, ease: Power3.easeInOut }}
      className="login-content"
    >
      <h1 id="login-heading">Login to Fubbly</h1>
      <form onSubmit={handleSubmit} className="formContainer">
        {error ? <span className="login-error">{error}</span> : ""}
        <div className="inputs-container">
          <label className="inputs-label" htmlFor="text">
            Email or Username
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
        <div className="inputs-container">
          <label htmlFor="password" className="inputs-label">
            Password
          </label>
          <input
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
              <i className="fas fa-eye-slash"></i>
            )}
          </span>
        </div>
        <button className="standardBtnLogin" type="submit">
          Log In
        </button>
        {showLink ? (
          <span id="register-link">
            Not registered?{" "}
            <Link
              onClick={() => setShowLink(false)}
              style={{ textDecoration: "none" }}
              to="/login/register"
            >
              Sign In
            </Link>
          </span>
        ) : (
          ""
        )}
      </form>
    </motion.div>
  );
};

export default LoginComponent;
