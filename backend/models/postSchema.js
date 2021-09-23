import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    likes: {
      type: Array,
      required: true,
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        profilePicture: {
          type: String,
        },
        likes: {
          type: Array,
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
