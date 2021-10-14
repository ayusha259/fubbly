import React from "react";
import { Avatar } from "@material-ui/core";
import classes from "./PostInput.module.css";

const PostInput = () => {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.profilePic}>
          <Avatar src="https://m.media-amazon.com/images/M/MV5BZWUzYjE1MDQtYmJlMS00ZDg5LWExOGQtYzgyZWY4MjEwMDFlXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" />
        </div>
        <div className={classes.content}>
          <div className={classes.text}>
            <input type="text" />
          </div>
          <div className={classes.upload}>
            <input type="text" />
            <button>Upload</button>
          </div>
        </div>
      </div>
      <div className={classes.imagePreview}></div>
    </div>
  );
};

export default PostInput;
