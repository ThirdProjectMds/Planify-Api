const Likes = require("../models/Like.model");

module.exports.create = async (like) => {
  Likes.create(like);
};

module.exports.delete = async (postId, author) => {
  await Likes.deleteOne({ postId, author });
};

module.exports.getMyLikes  = async (query) => {
  const likes = await Likes.find(query)
  .populate({ path: 'postId', populate: 'likes author'})
  return likes;
}
