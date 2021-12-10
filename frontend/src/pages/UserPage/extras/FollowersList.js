import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./FollowersList.scss";
import Dots from "../../../components/Loader/Dots/Dots";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import FollowUnfollow from "../../../components/FollowUnfollowBtn/FollowUnfollow";
import { followUnfollow } from "../../../actions/userAction";

const FollowersList = ({ handleClose, id, type }) => {
  const closeBtn = useRef();

  const { user, auth } = useSelector((state) => state.userInfo);

  const [list, setList] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${type}list/${id}`)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, type]);

  useEffect(() => {
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };
    return () => {
      window.onscroll = function () {};
    };
  });

  if (closeBtn.current) {
    closeBtn.current.addEventListener("click", () => {
      closeBtn.current.classList.add("push-close");
    });
  }
  const dispatch = useDispatch();
  const handleFollowUnfollow = (req, tok, id) => {
    dispatch(followUnfollow(req, tok, id));
  };

  return (
    <div className="followerslist--container">
      <span onClick={handleClose} id="close-btn" ref={closeBtn}>
        <i className="fas fa-times"></i>
      </span>
      <h3>{type[0].toUpperCase() + type.substring(1)}</h3>

      {list ? (
        list.length > 0 ? (
          list.map((u) => (
            <div key={u._id} className="followerlist--user">
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar src={u.profilePicture.url} />
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`../profile/${u.username}`}
                  onClick={handleClose}
                >
                  <span style={{ marginLeft: "7px" }} className="name">
                    {u.username}
                  </span>
                </Link>
              </span>
              {user._id !== u._id ? (
                <FollowUnfollow
                  handleClick={handleFollowUnfollow}
                  followed={user.following.includes(u._id)}
                  targetId={u._id}
                  token={auth.token}
                  type={user.following.includes(u._id) ? "unfollow" : "follow"}
                />
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <div className="noUsers">No Users Found</div>
        )
      ) : (
        <div className="followerlist--loading">
          <Dots />
        </div>
      )}
    </div>
  );
};

export default FollowersList;
