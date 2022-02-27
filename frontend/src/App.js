import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import ScrollToTop from "./components/ScrollToTop";
// import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ScrollToTop>
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
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
