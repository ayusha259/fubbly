import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import classes from "./UserSearch.module.css";
import { Avatar } from "@material-ui/core";
import FollowUnfollow from "./FollowUnfollow";
import { followUnfollow } from "../../actions/userAction";

const UserSearch = ({ search }) => {
  //   const [filtered, setFiltered] = useState([]);
  const { allUsers } = useSelector((state) => state.users);
  const { user, auth } = useSelector((state) => state.userInfo);
  const filteredUsers = () => {
    let f = allUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    );
    return f;
  };
  const dispatch = useDispatch();
  const handleFollowUnfollow = (req, tok, id) => {
    dispatch(followUnfollow(req, tok, id));
  };
  const searchUsers = filteredUsers();
  return (
    <motion.div
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
    </motion.div>
  );
};

export default UserSearch;
