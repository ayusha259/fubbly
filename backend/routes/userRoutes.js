import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
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
    const user = await User.findById(req.body.user_id).select(
      "-password -email"
    );
    if (user) {
      res.status(200);
      res.json(user);
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
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
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
  [upload.single("image"), auth],
  async (req, res, next) => {
    try {
      const { user_id, del } = req.body;
      // await User.findByIdAndUpdate(user_id, {
      //   profilePicture:
      //     del || req.file.path === ""
      //       ? "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
      //       : ,
      // });
      await User.findByIdAndUpdate(user_id, {
        profilePicture: `http://localhost:5000/uploads/${req.file.filename}`,
      });
      res.status(200).json({
        message: "Uploaded Successfully",
      });
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
);

route.put("/follow", auth, async (req, res, next) => {
  try {
    const { user_id, targetId } = req.body;
    await User.findByIdAndUpdate(user_id, {
      $push: { following: targetId },
    });
    await User.findByIdAndUpdate(targetId, {
      $push: { followers: user_id },
    });
    res.status(200).json("Followed successfully");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

route.put("/unfollow", auth, async (req, res, next) => {
  try {
    const { user_id, targetId } = req.body;
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

export default route;
