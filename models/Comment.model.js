const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
