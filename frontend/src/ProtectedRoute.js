import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.userInfo);
  return auth.isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
