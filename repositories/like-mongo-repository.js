const Likes = require("../models/Like.model");

module.exports.create = async (like) => {
  Likes.create(like);
};

module.exports.delete = async (postId, author) => {
  await Likes.deleteOne({ postId, author });
};