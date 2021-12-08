import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login/*" element={<LoginPage />} />
        {/* <ProtectedRoute exact path="/profile" component={ProfilePage} /> */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
