import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserComponent from "./extras/UserComponent";

import "./UserPage.scss";

const UserPage = () => {
  return (
    <div className="userpage-container">
      <Navbar />
      <UserComponent />
    </div>
  );
};

export default UserPage;
