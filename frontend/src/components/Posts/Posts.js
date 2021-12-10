import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

import { useSelector } from "react-redux";

import "./Posts.scss";
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
  // const [modal, setModal] = useState(false);
  const [like, setLike] = useState(liked);
  const [likedUsers, setLikedUsers] = useState(likes);
  const [cmt, setCmt] = useState("");
  // const [stateComments, setStateComments] = useState(comments);
  // const [noOfCmt, setNoOfCmt] = useState(comments.length);

  const { user, auth } = useSelector((state) => state.userInfo);

  // if (modal) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "auto";
  // }

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

  // const postCommentHandler = (id, comment) => {
  // postComment(id, comment);
  // setCmt("");
  // setNoOfCmt(noOfCmt + 1);
  // setStateComments((old) => [
  //   ...old,
  //   {
  //     comment: comment,
  //     user
  //     _id: Math.random(),
  //   },
  // ]);
  // };

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
  };

  return (
    <>
      <div className="post">
        <div className="post-head">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`../profile/${username}`}
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
          <i className="fas fa-quote-left"></i>{" "}
          <span>{readMoreCaption(content)}</span>
        </div>
        <span id="createdAt">{timeSince(created)}</span>
      </div>
    </>
  );
};

export default Posts;
