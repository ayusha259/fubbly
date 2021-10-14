import React, { useState } from "react";

import classes from "./FollowUnfollow.module.css";

const FollowUnfollow = (props) => {
  const { handleClick, type, targetId, token, followed } = props;
  const [isFollowed, setIsFollowed] = useState(followed);
  const handleFollow = (type, token, targetId) => {
    handleClick(type, token, targetId);
    setIsFollowed(!isFollowed);
  };
  return (
    <div
      className={`${classes.btn} ${
        !isFollowed ? classes.follow : classes.unfollow
      }`}
      onClick={() => handleFollow(type, token, targetId)}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </div>
  );
};

export default FollowUnfollow;
