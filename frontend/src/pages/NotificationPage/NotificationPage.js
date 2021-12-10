import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";

import "./NotificationPage.scss";

const NotificationPage = () => {
  const { auth } = useSelector((state) => state.userInfo);
  const [notifications, setNotifications] = useState(null);

  const getTitle = (type, user) => {
    if (type === "liked") {
      return `${user.username} liked your post`;
    } else if (type === "followed") {
      return `${user.username} followed you`;
    }
    return "";
  };

  useEffect(() => {
    axios
      .get("/api/users/notifications", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setNotifications(res.data);
      });
  }, [auth.token]);
  return (
    <>
      <Navbar showSearch={true} />
      {notifications ? (
        <div className="notification--list">
          {notifications.map((n) => (
            <div className="notification--div">
              <span id="notification-icon">
                {n.type === "liked" ? (
                  <i className="fas fa-heart"></i>
                ) : n.type === "followed" ? (
                  <i className="fas fa-user"></i>
                ) : (
                  ""
                )}
              </span>
              <div style={{ fontWeight: `${!n.read ? 500 : 300}` }}>
                <Avatar
                  src={n.targetId.profilePicture.url}
                  style={{ height: "32px", width: "32px" }}
                />
                <span>{getTitle(n.type, n.targetId)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NotificationPage;
