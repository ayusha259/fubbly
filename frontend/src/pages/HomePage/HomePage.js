import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getAllUsers, getFollowingPosts } from "../../actions/userAction";
import UserComponent from "./HomeExtra/UserComponent";
import "./HomePage.scss";
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
