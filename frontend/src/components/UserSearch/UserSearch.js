import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Dots from "../../components/Loader/Dots/Dots";
import { Avatar } from "@material-ui/core";
import FollowUnfollow from "../FollowUnfollowBtn/FollowUnfollow";
import { followUnfollow } from "../../actions/userAction";
import "./UserSearch.scss";
import axios from "axios";

const UserSearch = ({ search }) => {
  //   const [filtered, setFiltered] = useState([]);
  const [foundUsers, setFoundUsers] = useState();
  const { user, auth } = useSelector((state) => state.userInfo);
  // const filteredUsers = () => {
  //   let f = allUsers.filter(
  //     (u) =>
  //       u.name.toLowerCase().includes(search.toLowerCase()) ||
  //       u.username.toLowerCase().includes(search.toLowerCase())
  //   );
  //   return f;
  // };
  const handleReq = async () => {
    const { data } = await axios.get("/api/users/search", {
      params: { search },
    });
    setFoundUsers(data);
  };
  useEffect(() => {
    handleReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const dispatch = useDispatch();
  const handleFollowUnfollow = (req, tok, id) => {
    dispatch(followUnfollow(req, tok, id));
  };
  console.log(foundUsers);
  return (
    <div className="usersSearch">
      {foundUsers ? (
        foundUsers.length > 0 ? (
          foundUsers.map((u) =>
            u._id !== user._id ? (
              <div key={u._id} className="user">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={u.profilePicture.url} />
                  <span style={{ marginLeft: "7px" }} className="name">
                    {u.username}
                  </span>
                </span>
                <FollowUnfollow
                  handleClick={handleFollowUnfollow}
                  followed={user.following.includes(u._id)}
                  targetId={u._id}
                  token={auth.token}
                  type={user.following.includes(u._id) ? "unfollow" : "follow"}
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
        <div className="loading">
          <Dots />
        </div>
      )}
    </div>
  );
};

export default UserSearch;

// eslint-disable-next-line no-lone-blocks
{
  /* <motion.div
      name="userSearch"
      initial={{ opacity: 0, y: 100 }}
      animate={{ transition: { duration: 0.3 }, opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className={classes.usersSearch}
    >
      {searchUsers.length > 0 ? (
        searchUsers.map((u) =>
          u._id !== user._id ? (
            <div key={u._id} className={classes.user}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar src={u.profilePicture.url} />
                <span style={{ marginLeft: "7px" }} className={classes.name}>
                  {u.username}
                </span>
              </span>
              <FollowUnfollow
                handleClick={handleFollowUnfollow}
                followed={user.following.includes(u._id)}
                targetId={u._id}
                token={auth.token}
                type={user.following.includes(u._id) ? "unfollow" : "follow"}
              />
            </div>
          ) : (
            ""
          )
        )
      ) : (
        <div className={classes.noUsers}>No Users Found</div>
      )}
    </motion.div> */
}
