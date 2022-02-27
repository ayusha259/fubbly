import express from "express";
import User from "../models/userModel.js";
import { Post, Comment } from "../models/postSchema.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const route = express.Router();

route.post(
  "/upload",
  [auth, upload.single("image")],
  async (req, res, next) => {
    try {
      const user_id = req.user;
      const { ...rest } = req.body;
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${user_id}-${req.file.filename}`,
        folder: user_id,
      });
      fs.unlinkSync(req.file.path);
      const newPost = await Post.create({
        user: user_id,
        photo: { url: uploaded.url, public_id: uploaded.public_id },
        ...rest,
      });
      await User.findByIdAndUpdate(newPost.user, {
        $push: { posts: newPost._id },
      });
      res.status(200).json("newPost");
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
);

route.get("/userposts", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const posts = await Post.find({ user: user_id })
      .sort("-createdAt")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "user", select: "username profilePicture" },
      })
      .populate("likes", "username profilePicture");
    // posts.comments = posts.comments.populate("user");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

route.get("/followingposts", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id).select("following");
    if (user) {
      const posts = await Post.find()
        .where("user")
        .in(user.following)
        .sort("-createdAt")
        .populate("user", "username profilePicture")
        .populate({
          path: "comments",
          options: { sort: { createdAt: -1 } },
          populate: { path: "user", select: "username profilePicture" },
        })
        .populate("likes", "username profilePicture");
      res.status(200).json(posts);
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/like/:id", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const post = await Post.findById(req.params.id);
    if (post) {
      if (!post.likes.includes(user_id)) {
        await post.update({ $push: { likes: user_id } });
        // if (user_id !== post["user"]) {
        //   await User.findByIdAndUpdate(post["user"], {
        //     $push: {
        //       notifications: { type: "liked", targetId: user_id, read: false },
        //     },
        //   });
        // }
      } else {
        await post.update({ $pull: { likes: user_id } });
      }
      res.status(200).json("Success");
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } catch {
    next(error);
  }
});

route.put("/comments/:id", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const { comment } = req.body;
    const post = await Post.findById(req.params.id);
    const newComment = await Comment.create({
      user: user_id,
      comment: comment,
    });
    if (post) {
      await post.update({
        $push: {
          comments: newComment._id,
          // comments: {
          //   user: user_id,
          //   comment: comment,
          //   name: name,
          //   profilePicture: profilePicture,
          // },
        },
      });
      res.status(200).json("Comment Posted");
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
});

route.get("/comments/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const comments = await post.populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "user", select: "username profilePicture" },
          { path: "likes", model: "User", select: "username" },
        ],
      });
      res.status(200).json(comments["comments"]);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/comments/like/:id", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      if (!comment.likes.includes(user_id)) {
        await comment.update({ $push: { likes: user_id } });
        // if (user_id !== comment["user"]) {
        //   await User.findByIdAndUpdate(post["user"], {
        //     $push: {
        //       notifications: { type: "liked", targetId: user_id, read: false },
        //     },
        //   });
        // }
      } else {
        await comment.update({ $pull: { likes: user_id } });
      }
      res.status(200).json("Success");
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
});

export default route;
