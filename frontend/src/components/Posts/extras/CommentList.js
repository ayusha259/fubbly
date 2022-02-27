import React, { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Dots from "../../Loader/Dots/Dots";
import "./CommentList.scss";
import { useState } from "react";

const Comment = ({
  id,
  handleClose,
  comment,
  comment_user,
  liked,
  handleLike,
  no_likes,
}) => {
  const [like, setLike] = useState(liked);
  const [noOfLikes, setNoOfLikes] = useState(no_likes);
  return (
    <div key={id} className="comments--comment">
      <div className="comments-content-left">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`../profile/${comment_user}`}
          onClick={handleClose}
        >
          <span>{comment_user}</span>
        </Link>

        <div className="comments-content">{comment}</div>
      </div>
      <div className="comments-content-right">
        <FavoriteIcon
          onClick={() => {
            handleLike(id);
            setLike(!like);
            setNoOfLikes(like ? noOfLikes - 1 : noOfLikes + 1);
          }}
          style={{
            color: !like ? "#e4e5eb" : "#FC1550",
          }}
          // style={{ color: "#e4e5eb" }}
          className="interact-icons"
        />
        <span>{noOfLikes}</span>
      </div>
    </div>
  );
};

const CommentList = ({ comments, handleClose, user_id, handleLike }) => {
  const closeBtn = useRef();

  useEffect(() => {
    let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
    return () => {
      window.onscroll = () => {};
    };
  });
  if (closeBtn.current) {
    closeBtn.current.addEventListener("click", () => {
      closeBtn.current.classList.add("push-close");
    });
  }
  return (
    <div className="comments--container">
      <span onClick={handleClose} id="close-btn" ref={closeBtn}>
        <i className="fas fa-times"></i>
      </span>
      <h3>Comments</h3>
      {comments ? (
        comments.length > 0 ? (
          comments.map((c) => (
            <Comment
              id={c._id}
              handleClose={handleClose}
              comment={c.comment}
              user_id={user_id}
              comment_user={c.user.username}
              liked={c.likes.includes(user_id)}
              handleLike={handleLike}
              no_likes={c.likes.length}
            />
          ))
        ) : (
          <div className="noUsers">No Comments</div>
        )
      ) : (
        <div className="comments--loading">
          <Dots />
        </div>
      )}
      {/* <input type="text" className="comment-input" /> */}
    </div>
  );
};

export default CommentList;
