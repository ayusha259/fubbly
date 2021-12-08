import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dialog } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

import { useSelector } from "react-redux";

import "./Posts.scss";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
const Posts = (props) => {
  const {
    username,
    profile,
    content,
    image,
    likes,
    comments,
    liked,
    _id,
    // postComment,
    created,
  } = props;
  const [dialog, setDialog] = useState(false);
  const [modal, setModal] = useState(false);
  const [like, setLike] = useState(liked);
  const [likedUsers, setLikedUsers] = useState(likes);
  const [cmt, setCmt] = useState("");
  // const [noOfLikes, setNoOfLikes] = useState(likes.length);
  // const [stateComments, setStateComments] = useState(comments);
  // const [noOfCmt, setNoOfCmt] = useState(comments.length);

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

  const readMoreCaption = (caption) => {
    let array = caption.split(" ");
    if (array.length > 5) {
      array = array.slice(0, 5);
      return `${array.join(" ")} ...(more)`;
    }
    return array.join(" ");
  };

  const postCommentHandler = (id, comment) => {
    // postComment(id, comment);
    setCmt("");
    // setNoOfCmt(noOfCmt + 1);
    // setStateComments((old) => [
    //   ...old,
    //   {
    //     comment: comment,
    //     user
    //     _id: Math.random(),
    //   },
    // ]);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleLike = () => {
    const type = like ? "unlike" : "like";
    likeRequest();
    setLike(!like);

    if (type === "like") {
      setLikedUsers((state) => [...state, { username: user.username }]);
    } else {
      setLikedUsers((state) =>
        state.filter((s) => s.username !== user.username)
      );
    }
    // document
    //   .querySelector("#like_icon")
    //   .classList.toggle(`${classes.push_like}`);
  };

  return (
    <>
      <div className="post">
        <div className="post-head">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`./profile/${username}`}
          >
            <div className="post-user-info">
              <Avatar style={{ width: "37px", height: "37px" }} src={profile} />
              <span>{username}</span>
            </div>
          </Link>
          <MoreHorizOutlinedIcon className="mui-icon" />
        </div>
        <div onDoubleClick={handleLike} className="post-image">
          <img src={image.url} alt="" />
        </div>
        <div className="post-interact">
          <div className="likes-cmts">
            <FavoriteIcon
              onClick={handleLike}
              style={{ color: !like ? "#e4e5eb" : "#FC1550" }}
              className="interact-icons"
            />
            <ChatBubbleIcon
              style={{ color: "#e4e5eb" }}
              className="interact-icons"
            />
          </div>
        </div>
        <div className="liked-information">
          Liked by{" "}
          {likedUsers.length > 0 ? (
            <span>
              {likedUsers[likedUsers.length - 1].username}{" "}
              {likedUsers.length > 1
                ? `and ${likedUsers.length - 1} others`
                : ""}
            </span>
          ) : (
            <span>...</span>
          )}
        </div>
        <div className="post-caption">
          <i class="fas fa-quote-left"></i>{" "}
          <span>{readMoreCaption(content)}</span>
        </div>
        <span id="createdAt">{timeSince(created)}</span>
      </div>
    </>
  );
};

export default Posts;

// eslint-disable-next-line no-lone-blocks
{
  /* <Dialog onClose={handleDialogClose} open={dialog}>
        <div className={classes.all_cmt}>
          <div>
            {comments.map((comment) => (
              <div key={comment._id} className={classes.cmt}>
                <Avatar
                  src={comment.user.profilePicture.url}
                  style={{ marginRight: "10px" }}
                />
                <span>{`${comment.user.username} - `}</span>
                <span>{comment.comment}</span>
              </div>
            ))}
          </div>
          <div>
            <form
              className={`${classes.cmt_box}`}
              onSubmit={(e) => {
                e.preventDefault();
                postCommentHandler(_id, cmt);
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
      <div className={classes.tweetbox}>
        <div className={classes.tweetbox_user}>
          <div className={classes.tweetbox_user_inf}>
            <Avatar
              style={{ width: "40px", height: "40px", margin: "auto" }}
              src={profile.url}
            />
            <span>{username}</span>
          </div>
          <MoreHorizOutlinedIcon className={classes.mui_icon} />
        </div>
        <div className={classes.mainBody}>
          {image ? (
            <div onClick={() => setModal(true)} className={classes.bodyImage}>
              <img src={image.url} alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={classes.postContent}>
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
              {comments.length}
            </span>
          </div>
          <div className={classes.content}>
            <p>
              <span>{user.username} - </span>
              {content}
            </p>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#414a4c",
              }}
            >
              {timeSince(created)}
            </span>
          </div>
          <div className={classes.comment}>
            {comments.slice(-2).map((comment) => (
              <div key={comment._id} className={classes.cmtPreview}>
                <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                  {`${comment.user.username} -  `}
                </span>
                <span style={{ fontSize: "0.8rem" }}>{comment.comment}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <form
            className={classes.cmt_box}
            onSubmit={(e) => {
              e.preventDefault();
              postCommentHandler(_id, cmt);
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
      </div> */
}
