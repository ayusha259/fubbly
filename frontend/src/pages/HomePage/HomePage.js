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

const HomePage = () => {
  const { user, auth } = useSelector((state) => state.userInfo);
  const { allUsers } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.error);
  const { followingPosts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const [dialog, setDialog] = useState(false);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getFollowingPosts(auth.token));
    return () => {
      dispatch({ type: "CLEAN_FOLLOWING_POSTS" });
    };
  }, [dispatch, auth.token]);

  const handleFollowUnfollow = (req, tok, id) => {
    dispatch(followUnfollow(req, tok, id));
  };

  const handleFile = (evt) => {
    setImage(evt.target.files[0]);
    setImageUrl(URL.createObjectURL(evt.target.files[0]));
  };

  const commentRequest = async (id, comment, name, profile) => {
    await axios.put(
      `/api/posts/comment/${id}`,
      { comment: comment, name: name, profilePicture: profile },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
  };

  const postComment = (id, comment, name, profile) => {
    commentRequest(id, comment, name, profile);
  };

  const handleClose = () => {
    setDialog(false);
    setContent("");
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    handleClose();
    dispatch(uploadPost(auth.token, formData));
    dispatch(getFollowingPosts(auth.token));
  };

  const getIndUser = (id) => {
    const user = allUsers.find((u) => u._id === id);
    return {
      name: user.name,
      username: user.username,
      profile: user.profilePicture,
    };
  };

  let filterdUsers = user
    ? allUsers.filter((u) => u._id !== user._id)
    : allUsers;

  return (
    <div className="home-container">
      <div className="home--elements">
        <Routes>
          <Route path="" element={<HomeContent />} />
          <Route path="profile/:username" element={<UserPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="post" element={<AddPost />} />
        </Routes>
        <BottomBar />
      </div>
      <UserComponent />
    </div>
  );
};

export default HomePage;
