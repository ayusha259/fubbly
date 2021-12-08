import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import FeadView from "../../../components/FeedView/FeadView";
import "./HomeContent.scss";

const HomeContent = () => {
  return (
    <div className="homecontent-container">
      <Navbar />
      <FeadView />
    </div>
  );
};

export default HomeContent;
