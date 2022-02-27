import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/Search";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsIcon from "@material-ui/icons/Notifications";

import "./BottomBar.scss";
import { Badge } from "@material-ui/core";

const BottomBar = () => {
  const { user } = useSelector((state) => state.userInfo);
  const profile = useMatch("/home/profile/:username");
  const home = useMatch("/home");
  const search = useMatch("/home/search");
  const post = useMatch("/home/post");
  const notification = useMatch("/home/notifications");

  const countNotifications = () => {
    const arr = user.notifications.filter((n) => !n.read);
    return arr.length;
  };

  return (
    <>
      {user ? (
        <div className="home--bottombar">
          <Link to="../home">
            <div>
              {home ? (
                <HomeIcon className="mui--icon" />
              ) : (
                <HomeOutlinedIcon className="mui--icon" />
              )}
            </div>
          </Link>
          <Link className="hide--search" to="../home/search">
            <div>
              {search ? (
                <SearchIcon className="mui--icon" />
              ) : (
                <SearchOutlinedIcon className="mui--icon" />
              )}
            </div>
          </Link>
          <Link to="../home/post">
            <div>
              {post ? (
                <AddCircleIcon className="mui--icon" />
              ) : (
                <AddCircleOutlineOutlinedIcon className="mui--icon" />
              )}
            </div>
          </Link>
          <Link to="../home/notifications">
            <div>
              {notification ? (
                <NotificationsIcon className="mui--icon" />
              ) : (
                <Badge badgeContent={countNotifications()} color="secondary">
                  <NotificationsNoneIcon className="mui--icon" />
                </Badge>
              )}
            </div>
          </Link>
          <Link to={`../home/profile/${user.username}`}>
            <div>
              {profile ? (
                <AccountCircleIcon className="mui--icon" />
              ) : (
                <AccountCircleOutlinedIcon className="mui--icon" />
              )}
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BottomBar;
