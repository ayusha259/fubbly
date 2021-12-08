import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../../actions/userAction";
import EditComponent from "./Edit/EditComponent";
import "./UserComponent.scss";
import PostForm from "./PostForm/PostForm";

const UserComponent = () => {
  const { user } = useSelector((state) => state.userInfo);
  const [showEdit, setShowEdit] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };
  return (
    <>
      {user ? (
        <div className="user-container">
          <AnimatePresence exitBeforeEnter>
            {showEdit ? (
              <EditComponent closeHandle={() => setShowEdit(false)} />
            ) : showPostForm ? (
              <PostForm closeHandle={() => setShowPostForm(false)} />
            ) : (
              <motion.div
                key="user"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="user-content"
              >
                <div className="userInfo-head">
                  <div className="userInfo-display">
                    <img src={user.profilePicture.url} alt="" />
                  </div>
                  <div className="userInfo-details">
                    <Link
                      to={`./profile/${user.username}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <span>{user.username}</span>
                    </Link>
                    <span>{user.name}</span>
                  </div>
                  <div className="userInfo-edit">
                    <span onClick={() => setShowEdit(true)}>Edit</span>
                  </div>
                  <div style={{ marginTop: "20px" }} className="userInfo-edit">
                    <span onClick={() => setShowPostForm(true)}>
                      Upload Post
                    </span>
                  </div>
                </div>
                <div className="userInfo-followings">
                  <div id="num-posts">
                    {user.posts.length}
                    <span>Posts</span>
                  </div>
                  <div id="num-followers">
                    {user.followers.length}
                    <span>Followers</span>
                  </div>
                  <div id="num-followings">
                    {user.following.length}
                    <span>Following</span>
                  </div>
                </div>
                <div className="userInfo-rest">
                  <div className="userInfo-bio">
                    <span className="userBio-name">{user.name}</span>
                    <span className="userBio-bio">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore tempora tempore, aliquid quaerat dolorum aperiam
                      quidem assumenda illum tenetur nam rerum exercitationem?
                    </span>
                  </div>
                  <div className="userInfo-post" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserComponent;

// (
//   <motion.div
//     key="user"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     transition={{ duration: 0.3 }}
//     className="user-content"
//   >
//     <div className="userInfo-head">
//       <div className="userInfo-display">
//         <img src={user.profilePicture.url} alt="" />
//       </div>
//       <div className="userInfo-details">
//         <span>{user.username}</span>
//         <span>{user.name}</span>
//       </div>
//       <div className="userInfo-edit">
//         <span onClick={() => setShowEdit(true)}>Edit</span>
//       </div>
//     </div>
//     <div className="userInfo-followings">
//       <div id="num-posts">
//         {user.posts.length}
//         <span>Posts</span>
//       </div>
//       <div id="num-followers">
//         {user.followers.length}
//         <span>Followers</span>
//       </div>
//       <div id="num-followings">
//         {user.following.length}
//         <span>Following</span>
//       </div>
//     </div>
//     <div className="userInfo-rest">
//       <div className="userInfo-bio">
//         <span className="userBio-name">{user.name}</span>
//         <span className="userBio-bio">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit.
//           Dolore tempora tempore, aliquid quaerat dolorum aperiam
//           quidem assumenda illum tenetur nam rerum exercitationem?
//         </span>
//       </div>
//       <div className="userInfo-post" onClick={handleLogout}>
//         Logout
//       </div>
//     </div>
//   </motion.div>
// )
