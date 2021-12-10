import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  followUnfollow,
  getAllUsers,
  getFollowingPosts,
  uploadPost,
} from "../../actions/userAction";
import UserComponent from "./HomeExtra/UserComponent";
import Avatar from "@material-ui/core/Avatar";
import FollowUnfollow from "../../components/FollowUnfollowBtn/FollowUnfollow";
import Loader from "../../components/Loader/Loader";
import Posts from "../../components/Posts/Posts";
import { Dialog, TextField, Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import "./HomePage.scss";
import axios from "axios";
import HomeContent from "./HomeExtra/HomeContent";
import UserPage from "../UserPage/UserPage";
import BottomBar from "../../components/BottomBar/BottomBar";
import SearchPage from "../SearchPage/SearchPage";
import AddPost from "../AddPostPage/AddPost";
import NotificationPage from "../NotificationPage/NotificationPage";

const HomePage = () => {
  const { auth } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getFollowingPosts(auth.token));
    return () => {
      dispatch({ type: "CLEAN_FOLLOWING_POSTS" });
    };
  }, [dispatch, auth.token]);

  return (
    <div className="home-container">
      <div className="home--elements">
        <Routes>
          <Route path="" element={<HomeContent />} />
          <Route path="profile/:username" element={<UserPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="post" element={<AddPost />} />
          <Route path="notifications" element={<NotificationPage />} />
        </Routes>
        <BottomBar />
      </div>
      <UserComponent />
    </div>
  );
};

export default HomePage;
