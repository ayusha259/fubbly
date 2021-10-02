import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    profilePicture: {
      url: {
        type: String,
        required: true,
        default:
          "https://res.cloudinary.com/social-mern/image/upload/v1633171722/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar_tlkm1m.jpg",
      },
      public_id: {
        type: String,
        required: true,
        default:
          "depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar_tlkm1m",
      },
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
