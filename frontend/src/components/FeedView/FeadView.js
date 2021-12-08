import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingPosts } from "../../actions/userAction";
import Posts from "../Posts/Posts";

const FeadView = () => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state.userInfo);
  const { followingPosts } = useSelector((state) => state.posts);
  const breakpointColumnsObj = {
    default: 3,
    1050: 2,
    750: 1,
  };
  useEffect(() => {
    dispatch(getFollowingPosts(auth.token));
    return () => {
      dispatch({ type: "CLEAN_FOLLOWING_POSTS" });
    };
  }, [dispatch, auth.token]);
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="home-posts-container"
    >
      {followingPosts.map((post) => (
        <div className="ind-posts-container">
          <Posts
            key={post._id}
            _id={post._id}
            username={post.user.username}
            profile={post.user.profilePicture.url}
            content={post.content}
            image={post.photo}
            likes={post.likes}
            comments={post.comments}
            width="80%"
            liked={post.likes.some((u) => u._id === user._id)}
            // postComment={postComment}
            created={new Date(post.createdAt)}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default FeadView;
