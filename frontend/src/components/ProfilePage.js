import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getUserPosts, uploadImage } from "../actions/userAction";
import Loader from "./extras/Loader";
import Posts from "./extras/Posts";
import classes from "./ProfilePage.module.css";
import axios from "axios";

const ProfilePage = () => {
  const [modal, setModel] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { user, auth, posts } = useSelector((state) => state.userInfo);

  const handleClose = () => {
    setModel(false);
  };

  const dispatch = useDispatch();

  const handleUpload = () => {
    dispatch(uploadImage(auth.token, imageUrl, false));
    setModel(false);
    setImageUrl("");
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
    dispatch(getUserPosts(auth.token));
  };

  useEffect(() => {
    dispatch(getUserPosts(auth.token));
    return () => {
      dispatch({ type: "POSTS_CLEANUP" });
    };
  }, [dispatch, auth.token]);
  return (
    <>
      {user ? (
        <>
          <Dialog onClose={handleClose} open={modal}>
            <div className={classes.uploadImage}>
              <h1>Upload Image</h1>
              <div className={classes.dialogImage}>
                <img src={imageUrl} alt="" />
              </div>
              <div style={{ padding: "10px 0" }}>
                <TextField
                  label="ImageUrl"
                  style={{ width: "350px" }}
                  variant="outlined"
                  onChange={(evt) => setImageUrl(evt.target.value)}
                  type="text"
                  value={imageUrl}
                />
              </div>
              <div>
                <Button
                  style={{ width: "100px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>
            </div>
          </Dialog>
          <div className={classes.main}>
            <div className={classes.headInfo}>
              <div className={classes.profilePic}>
                <img src={user.profilePicture} alt="" />

                <i
                  onClick={() => setModel(true)}
                  className={`fas fa-camera ${classes.uploadImageIcon}`}
                ></i>
                {/* <span
                  style={{
                    color: "#0a6ed1",
                    cursor: "pointer",
                    marginTop: "5px",
                  }}
                  onClick={() => setModel(true)}
                >
                  Change Image
                </span> */}
              </div>
              <div className={classes.nameFollow}>
                <span className={classes.name}>{user.name}</span>
                <div className={classes.followings}>
                  <span>{user.followers.length} Followers</span>
                  <span>{user.following.length} Following</span>
                </div>
              </div>
            </div>
            {posts.length > 0 ? (
              <div className={classes.posts}>
                {posts.map((post) => (
                  <Posts
                    key={post._id}
                    _id={post._id}
                    liked={post.likes.includes(user._id)}
                    name={user.name}
                    profile={user.profilePicture}
                    content={post.content}
                    image={post.photo}
                    likes={post.likes.length}
                    comments={post.comments}
                    width="45%"
                    postComment={postComment}
                    created={new Date(post.createdAt)}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfilePage;
