import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector((state) => state.userInfo);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
