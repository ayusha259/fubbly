import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FollowUnfollow from "../../components/FollowUnfollowBtn/FollowUnfollow";
import Dots from "../../components/Loader/Dots/Dots";
import Navbar from "../../components/Navbar/Navbar";
import { followUnfollow } from "../../actions/userAction";
import "./SearchPage.scss";

const SearchPage = () => {
  const [foundUsers, setFoundUsers] = useState();
  const [search, setSearch] = useState("");
  const { user, auth } = useSelector((state) => state.userInfo);
  const handleReq = async () => {
    const { data } = await axios.get("/api/users/search", {
      params: { search },
    });
    setFoundUsers(data);
  };
  useEffect(() => {
    if (search) {
      handleReq();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const dispatch = useDispatch();
  const handleFollowUnfollow = (req, tok, id) => {
    dispatch(followUnfollow(req, tok, id));
  };

  return (
    <>
      <Navbar showSearch={false} />
      <div className="searchpage--container">
        <div className="searchpage--input-container">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <i className="fas fa-search"></i>
        </div>
        {foundUsers ? (
          foundUsers.length > 0 ? (
            foundUsers.map((u) =>
              u._id !== user._id ? (
                <div key={u._id} className="searchpage--user">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={u.profilePicture.url} />
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`../profile/${u.username}`}
                    >
                      <span style={{ marginLeft: "7px" }} className="name">
                        {u.username}
                      </span>
                    </Link>
                  </span>
                  <FollowUnfollow
                    handleClick={handleFollowUnfollow}
                    followed={user.following.includes(u._id)}
                    targetId={u._id}
                    token={auth.token}
                    type={
                      user.following.includes(u._id) ? "unfollow" : "follow"
                    }
                  />
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <div className="noUsers">No Users Found</div>
          )
        ) : (
          <div className="loading">{search ? <Dots /> : ""}</div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
