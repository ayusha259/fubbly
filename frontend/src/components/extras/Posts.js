import React, { useState } from "react";
import { Avatar, Dialog } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

import { useSelector } from "react-redux";

import classes from "./Posts.module.css";
const Posts = (props) => {
  const {
    name,
    profile,
    content,
    image,
    likes,
    comments,
    width,
    liked,
    _id,
    postComment,
    created,
  } = props;
  const [dialog, setDialog] = useState(false);
  const [modal, setModal] = useState(false);
  const [like, setLike] = useState(liked);
  const [cmt, setCmt] = useState("");
  const [noOfLikes, setNoOfLikes] = useState(likes);
  const [stateComments, setStateComments] = useState(comments);
  const [noOfCmt, setNoOfCmt] = useState(comments.length);

  const { user, auth } = useSelector((state) => state.userInfo);

  if (modal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  const likeRequest = async () => {
    await axios.put(
      `/api/posts/like/${_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
  };

  console.log(stateComments.slice(-2));

  const postCommentHandler = (id, comment, name, profile) => {
    postComment(id, comment, name, profile);
    setCmt("");
    setNoOfCmt(noOfCmt + 1);
    setStateComments((old) => [
      ...old,
      {
        name: name,
        profilePicture: profile,
        comment: comment,
        _id: Math.random(),
      },
    ]);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleLike = (type) => {
    likeRequest();
    setLike(!like);
    if (type === "like") {
      setNoOfLikes(noOfLikes + 1);
    } else {
      setNoOfLikes(noOfLikes - 1);
    }
    document
      .querySelector("#like_icon")
      .classList.toggle(`${classes.push_like}`);
  };

  return (
    <>
      <Dialog onClose={handleDialogClose} open={dialog}>
        <div className={classes.all_cmt}>
          <div>
            {stateComments.map((comment) => (
              <div key={comment._id} className={classes.cmt}>
                <Avatar
                  style={{ margin: "0 5px" }}
                  src={comment.profilePicture}
                />
                <span>{`${comment.name} - `}</span>
                <span>{comment.comment}</span>
              </div>
            ))}
          </div>
          <div>
            <form
              className={`${classes.cmt_box}`}
              onSubmit={(e) => {
                e.preventDefault();
                postCommentHandler(_id, cmt, user.name, user.profilePicture);
              }}
            >
              <input
                placeholder="Comment"
                className={classes.cmt_input}
                type="text"
                value={cmt}
                onChange={(e) => setCmt(e.target.value)}
              />
              <button
                type="submit"
                disabled={cmt === ""}
                className={`${classes.cmt_btn} ${
                  cmt ? classes.cmt_btn_active : ""
                }`}
              >
                POST
              </button>
            </form>
          </div>
        </div>
      </Dialog>
      <div style={{ width: width }} className={classes.tweetbox}>
        <div className={classes.tweetbox_user}>
          <div className={classes.tweetbox_user_inf}>
            <Avatar
              style={{ width: "45px", height: "45px", margin: "auto" }}
              src={profile}
            />
            <span>{name}</span>
          </div>
          <MoreHorizOutlinedIcon className={classes.mui_icon} />
          {/* {popup ? (
          <div onClick={handleDelete} className={classes.tweetbox_popup}>
            <DeleteOutlineIcon className={classes.mui_icon} />
            <span>Delete the tweet</span>
          </div>
        ) : (
          ""
        )} */}
        </div>
        <div className={classes.mainBody}>
          {image ? (
            <div onClick={() => setModal(true)} className={classes.bodyImage}>
              <img src={image} alt="" />
            </div>
          ) : (
            ""
          )}
          {modal ? (
            <div onClick={() => setModal(false)} className={classes.fullImage}>
              <img src={image} alt="" />
            </div>
          ) : (
            ""
          )}
          <div className={classes.content}>
            <p>{content}</p>
          </div>
          <span
            style={{ fontSize: "0.65rem", color: "#414a4c", marginTop: "10px" }}
          >
            {timeSince(created)}
          </span>
          {/* {tweetimage === "" ? (
          ""
        ) : (
          <div className={classes.tweetbox_body_image}>
            <img src={tweetimage} alt="TweetImage" />
          </div>
        )} */}
        </div>
        <div className={classes.tweetbox_likes}>
          <span className={classes.like_icon}>
            {like ? (
              <FavoriteIcon
                id="like_icon"
                onClick={() => handleLike("dislike")}
                style={{ color: "#ea442b" }}
                className={classes.mui_icon}
              />
            ) : (
              <FavoriteBorderIcon
                id="like_icon"
                onClick={() => handleLike("like")}
                className={classes.mui_icon}
              />
            )}
            {noOfLikes}
          </span>
          <span className={classes.comment_icon}>
            <ChatBubbleOutlineIcon
              onClick={() => setDialog(true)}
              className={classes.mui_icon}
            />{" "}
            {noOfCmt}
          </span>
        </div>
        <div>
          {stateComments.slice(-2).map((comment) => (
            <div key={comment._id} className={classes.cmtPreview}>
              <Avatar
                style={{ margin: "0 5px", width: "20px", height: "20px" }}
                src={comment.profilePicture}
              />
              <span
                style={{ fontSize: "0.8rem" }}
              >{`${comment.name} -  `}</span>
              <span style={{ fontSize: "0.8rem" }}>{comment.comment}</span>
            </div>
          ))}
        </div>
        <div>
          <form
            className={classes.cmt_box}
            onSubmit={(e) => {
              e.preventDefault();
              postCommentHandler(_id, cmt, user.name, user.profilePicture);
            }}
          >
            <input
              placeholder="Comment"
              className={classes.cmt_input}
              type="text"
              value={dialog ? "" : cmt}
              onChange={(e) => setCmt(e.target.value)}
            />
            <button
              type="submit"
              disabled={cmt === ""}
              className={`${classes.cmt_btn} ${
                cmt ? classes.cmt_btn_active : ""
              }`}
            >
              POST
            </button>
          </form>
        </div>
      </div>
    </>
    // <div className={classes.posts}>
    //   <div className={classes.userInfo}>
    //     <div className={classes.nameDp}>
    //       <Avatar
    //         style={{ width: "38px", height: "38px" }}
    //         src="https://m.media-amazon.com/images/M/MV5BZWUzYjE1MDQtYmJlMS00ZDg5LWExOGQtYzgyZWY4MjEwMDFlXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg"
    //         alt=""
    //       />
    //       <span className={classes.name}>Chandler Bing</span>
    //     </div>
    //   </div>
    //   <div className={classes.imageContainer}>
    //     <img src="" alt="" />
    //   </div>
    //   <div className={classes.postContent}></div>
    // </div>
  );
};

export default Posts;
