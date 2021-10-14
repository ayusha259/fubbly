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
          "https://res.cloudinary.com/social-mern/image/upload/v1634116067/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392_qws903.jpg",
      },
      public_id: {
        type: String,
        required: true,
        default:
          "default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392_qws903",
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
