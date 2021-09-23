import axios from "axios";
import { authConfig, errorHandler, loginUser, getUser } from "./actionHelpers";

//LOGIN THE USER AND GET THE USER TO SET THE STATE
const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    const { data } = await axios.post("/api/users/login", { email, password });
    await loginUser(dispatch, data);
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    console.log("outer error");
    errorHandler(error, dispatch);
  }
};

//REGISTER THE USER AND GET THE REGISTERED USER
const userRegister = (regUser) => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    const { data } = await axios.post("/api/users/register", { ...regUser });
    await loginUser(dispatch, data);
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

//GET LOGGED IN USER DATA AUTH
const getUserInfo = (token) => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    await getUser(dispatch, token);
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

//LOG OUT THE USER
const userLogout = () => (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  localStorage.removeItem("token");
};

//GET ALL THE USERS
const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    const { data } = await axios.get("/api/users/allusers");
    dispatch({ type: "GET_ALL_USERS", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

//FOLLOW AND UNFOLLOW A USER
const followUnfollow = (request, token, targetId) => async (dispatch) => {
  try {
    const config = authConfig(token);
    await axios.put(`/api/users/${request}`, { targetId }, config);
    await getUser(dispatch, token);
  } catch (error) {}
};

//UPLOAD THE PROFILE PICTURE
const uploadImage = (token, image_url, del) => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    const config = authConfig(token);
    await axios.put("/api/users/uploadImage", { image_url, del }, config);
    await getUser(dispatch, token);
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

//GET A USER POSTS
const getUserPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    const config = authConfig(token);
    const { data } = await axios.get(`/api/posts/userposts`, config);
    dispatch({ type: "USER_POSTS", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

//GET USER FOLLOWING POSTS
const getFollowingPosts = (token) => async (dispatch) => {
  try {
    const config = authConfig(token);
    const { data } = await axios.get("/api/posts/followingposts", config);
    dispatch({ type: "GET_FOLLOWING_POSTS", payload: data });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

const uploadPost = (token, data) => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST" });
    const config = authConfig(token);
    await axios.post("/api/posts/upload", data, config);
    dispatch({ type: "SUCCESS" });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export {
  userLogin,
  getUserInfo,
  userLogout,
  userRegister,
  getAllUsers,
  followUnfollow,
  uploadImage,
  getUserPosts,
  getFollowingPosts,
  uploadPost,
};
