import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { useParams, useNavigate } from "react-router-dom";

import "./UserComponent.scss";
import Masonry from "react-masonry-css";
import Posts from "../../../components/Posts/Posts";
import { useSelector, useDispatch } from "react-redux";
import FollowUnfollow from "../../../components/FollowUnfollowBtn/FollowUnfollow";
import { followUnfollow } from "../../../actions/userAction";
import FollowersList from "./FollowersList";

const UserComponent = () => {
  const { user: curr_user, auth } = useSelector((state) => state.userInfo);
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followersListType, setFollowersListType] = useState("");

  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 3,
    1050: 2,
    750: 1,
  };

  useEffect(() => {
    axios.get(`/api/users/${username}`).then((res) => {
      setUser(res.data);
    });
    //   .catch((err) => {
    //     navigate("/notfound");
    //   });
  }, [navigate, username]);

  const dispatch = useDispatch();

  const handleFollowUnfollow = (req, tok, id) => {
    dispatch(followUnfollow(req, tok, id));
  };

  const handleMenu = (type) => {
    setFollowersListType(type);
    setShowFollowers(true);
  };

  // if (showFollowers) {
  //   document.body.style.overflowY = "no-scroll";
  // } else {
  //   document.body.style.overflowY = "auto";
  // }

  return (
    <div>
      {showFollowers ? (
        <FollowersList
          id={user._id}
          handleClose={() => setShowFollowers(false)}
          type={followersListType}
        />
      ) : null}
      {user ? (
        <div className="usercomp-container">
          <div className="usercomp-header">
            <div className="usercomp--header-left">
              <div className="usercomp--header-left-image">
                <img src={user.profilePicture.url} alt="" />
              </div>
            </div>
            <div className="usercomp--header-right">
              <div className="usercomp--header-right-follows">
                <div id="num-posts">
                  {user.posts.length}
                  <span>Posts</span>
                </div>
                <div
                  onClick={(e) => handleMenu("followers")}
                  id="num-followers"
                >
                  {user.followers.length}
                  <span>Followers</span>
                </div>
                <div
                  onClick={(e) => handleMenu("following")}
                  id="num-followings"
                >
                  {user.following.length}
                  <span>Following</span>
                </div>
              </div>
              <div className="usercomp--header-right-userdetails">
                <div className="usercomp--header-right-deatils">
                  <span>{user.name}</span>
                  <span>{user.username}</span>
                </div>
                <div className="usercomp--header-right-bio">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore tempora tempore, aliquid quaerat dolorum aperiam
                    quidem assumenda illum tenetur nam rerum exercitationem?
                  </p>
                </div>
                {curr_user._id !== user._id ? (
                  <div className="usercomp--followbtn">
                    <FollowUnfollow
                      handleClick={handleFollowUnfollow}
                      followed={curr_user.following.includes(user._id)}
                      targetId={user._id}
                      token={auth.token}
                      type={
                        curr_user.following.includes(user._id)
                          ? "unfollow"
                          : "follow"
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {user.posts.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="usercomp-posts-container"
            >
              {user.posts.map((post) => (
                <div className="ind-posts-container">
                  <Posts
                    key={post._id}
                    _id={post._id}
                    username={user.username}
                    profile={user.profilePicture.url}
                    content={post.content}
                    image={post.photo}
                    likes={post.likes}
                    comments={post.comments}
                    width="80%"
                    liked={post.likes.some((u) => u === curr_user._id)}
                    created={new Date(post.createdAt)}
                  />
                </div>
              ))}
            </Masonry>
          ) : (
            <div>No Posts</div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserComponent;
