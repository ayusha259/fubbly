import express from "express";
import User from "../models/userModel.js";
import Post from "../models/postSchema.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";

const route = express.Router();

route.post(
  "/upload",
  [upload.single("image"), auth],
  async (req, res, next) => {
    try {
      const { user_id, ...rest } = req.body;
      const newPost = await Post.create({
        user: user_id,
        photo: `http://localhost:5000/uploads/${req.file.filename}`,
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
    const { user_id } = req.body;
    const posts = await Post.find({ user: user_id }).sort("-createdAt");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

route.get("/followingposts", auth, async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const user = await User.findById(user_id).select("following");
    if (user) {
      const posts = await Post.find()
        .where("user")
        .in(user.following)
        .sort("-createdAt");
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
    const { user_id } = req.body;
    const post = await Post.findById(req.params.id);
    if (post) {
      if (!post.likes.includes(user_id)) {
        await post.update({ $push: { likes: user_id } });
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

route.put("/comment/:id", auth, async (req, res, next) => {
  try {
    const { user_id, comment, name, profilePicture } = req.body;
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.update({
        $push: {
          comments: {
            user: user_id,
            comment: comment,
            name: name,
            profilePicture: profilePicture,
          },
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

export default route;
