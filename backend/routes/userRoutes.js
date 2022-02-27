import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
const route = express.Router();

route.post("/register", async (req, res, next) => {
  try {
    const userExists = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (userExists) {
      res.status(400);
      throw new Error("User Already exists");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);

    res.status(201);
    res.json({
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200);
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Email or password invalid");
    }
  } catch (error) {
    next(error);
  }
});

route.get("/auth/userData", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id).select("-password -email");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500);
      throw new Error("Please Login Again");
    }
  } catch (error) {
    next(error);
  }
});

route.get("/allusers", async (req, res, next) => {
  try {
    const allUsers = await User.find({}).select(
      "username name _id profilePicture"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

route.get("/search", async (req, res, next) => {
  try {
    const { search } = req.query;
    const regex = { $regex: ".*" + search + ".*", $options: "i" };
    const searchedUsers = await User.find({
      $or: [{ name: regex }, { username: regex }],
    }).select("username name profilePicture");
    res.status(200).json(searchedUsers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

route.get("/notifications", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id)
      .select("notifications")
      .populate({
        path: "notifications.targetId",
        model: "User",
        select: "username profilePicture",
        options: { strictPopulate: false },
      })
      .sort("-createdAt");
    if (!user) {
      res.status(404);
      throw new Error("No user Found");
    }
    await User.findByIdAndUpdate(
      user_id,
      {
        $set: { "notifications.$[elem].read": true },
      },
      {
        multi: true,
        arrayFilters: [{ "elem.read": false }],
      }
    );
    res.status(200).json(user["notifications"]);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

route.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password -email")
      .populate({
        path: "posts",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "comments",
          options: { sort: { createdAt: -1 } },
          populate: { path: "user", select: "username" },
        },
      });
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(500);
      throw new Error("No user exists");
    }
  } catch (error) {
    next(error);
  }
});

route.put(
  "/uploadImage",
  [auth, upload.single("image")],
  async (req, res, next) => {
    try {
      const user_id = req.user;
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${user_id}-${req.file.filename}`,
        folder: user_id,
      });
      const { profilePicture: oldDp } = await User.findOneAndUpdate(
        { _id: user_id },
        {
          profilePicture: {
            url: uploaded.url,
            public_id: uploaded.public_id,
          },
        }
      );
      await cloudinary.uploader.destroy(oldDp.public_id);
      fs.unlinkSync(req.file.path);
      res.status(200).json({
        message: "Uploaded Successfully",
      });
      // res.status(200).send(user_id);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
);

route.put("/follow", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const { targetId } = req.body;
    if (user_id === targetId) {
      res.status(400);
      throw new Error("Cant follow yourself");
    }
    await User.findByIdAndUpdate(user_id, {
      $push: { following: targetId },
    });
    await User.findByIdAndUpdate(targetId, {
      $push: { followers: user_id },
    });
    // await User.findByIdAndUpdate(targetId, {
    //   $push: {
    //     notifications: { type: "followed", targetId: user_id, read: false },
    //   },
    // });
    res.status(200).json("Followed successfully");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

route.put("/unfollow", auth, async (req, res, next) => {
  try {
    const user_id = req.user;
    const { targetId } = req.body;
    if (user_id === targetId) {
      res.status(400);
      throw new Error("Cant unfollow yourself");
    }
    await User.findByIdAndUpdate(user_id, {
      $pull: { following: targetId },
    });
    await User.findByIdAndUpdate(targetId, {
      $pull: { followers: user_id },
    });
    res.status(200).json("Unfollowed successfully");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

route.get("/followerslist/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate({
      path: "followers",
      model: "User",
      select: "username name profilePicture",
      options: { sort: { name: 1 } },
    });
    if (!user) {
      res.status(404);
      throw new Error("No user Found");
    }
    const followers = user["followers"];
    res.status(200).json(followers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

route.get("/followinglist/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate({
      path: "following",
      model: "User",
      select: "username name profilePicture",
      options: { sort: { name: 1 } },
    });
    if (!user) {
      res.status(404);
      throw new Error("No user Found");
    }
    const following = user["following"];
    res.status(200).json(following);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default route;
