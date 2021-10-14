import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <div className="home-bar"></div>
      <HomeContent />
      <UserComponent />
    </div>
  );
};

export default HomePage;

// {loading ? (
//   <Loader />
// ) : (
//   <>
//     <Dialog onClose={handleClose} open={dialog}>
//       <div className={classes.uploadImage}>
//         <h1>Upload Post</h1>

//         <div className={classes.dialogImage}>
//           <img src={imageUrl} alt="" />
//         </div>

//         <div style={{ padding: "10px 0" }}>
//           <TextField
//             label="Content"
//             style={{
//               width: "100%",
//               marginBottom: "10px",
//             }}
//             variant="standard"
//             onChange={(evt) => setContent(evt.target.value)}
//             type="text"
//             multiline
//             maxRows={1}
//             value={content}
//           />
//           <input
//             style={{ width: "100%" }}
//             onChange={handleFile}
//             type="file"
//           />
//         </div>
//         <div>
//           <Button
//             onClick={handleSubmit}
//             style={{ width: "100px" }}
//             variant="contained"
//             color="primary"
//           >
//             Upload
//           </Button>
//         </div>
//       </div>
//     </Dialog>
//     <div className={classes.container}>
//       <div className={classes.feedContainer}>
//         <div className={classes.feed}>
//           {followingPosts.map((post) => (
//             <Posts
//               key={post._id}
//               _id={post._id}
//               {...getIndUser(post.user)}
//               content={post.content}
//               image={post.photo}
//               likes={post.likes.length}
//               comments={post.comments}
//               width="80%"
//               liked={post.likes.includes(user._id)}
//               postComment={postComment}
//               created={new Date(post.createdAt)}
//             />
//           ))}
//         </div>
//         <div className={classes.users}>
//           <h1>USERS</h1>
//           {filterdUsers.map((u) => (
//             <div key={u._id} className={classes.user}>
//               <span style={{ display: "flex", alignItems: "center" }}>
//                 <Avatar src={u.profilePicture.url} />
//                 <span
//                   style={{ marginLeft: "7px" }}
//                   className={classes.name}
//                 >
//                   {u.name}
//                 </span>
//               </span>
//               <FollowUnfollow
//                 handleClick={handleFollowUnfollow}
//                 followed={user.following.includes(u._id)}
//                 targetId={u._id}
//                 token={auth.token}
//                 type={
//                   user.following.includes(u._id) ? "unfollow" : "follow"
//                 }
//               />
//             </div>
//           ))}
//         </div>
//         <Tooltip
//           title="Upload"
//           onClick={() => setDialog(true)}
//           disableHoverListener
//           className={classes.postAddBtn}
//           style={{
//             position: "fixed",
//             bottom: "40px",
//             right: "40px",
//             transition: "0.5s",
//           }}
//         >
//           <Fab color="primary" className={classes.absolute}>
//             <AddIcon />
//           </Fab>
//         </Tooltip>
//       </div>
//     </div>
//   </>
// )}
