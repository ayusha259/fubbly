import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../../../actions/userAction";
import Masonry from "react-masonry-css";
import Posts from "../../../components/Posts/Posts";
import "./HomeContent.scss";
import Navbar from "../../../components/Navbar/Navbar";
const HomeContent = () => {
  const dispatch = useDispatch();

  const { user, auth } = useSelector((state) => state.userInfo);
  const { followingPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getFollowingPosts(auth.token));
    return () => {
      dispatch({ type: "CLEAN_FOLLOWING_POSTS" });
    };
  }, [dispatch, auth.token]);

  return (
    <div className="homecontent-container">
      <Navbar />
      <Masonry breakpointCols={3} className="home-posts-container">
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
    </div>
  );
};

export default HomeContent;
