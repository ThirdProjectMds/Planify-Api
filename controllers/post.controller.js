// Post = require("../models/Post.model");
// const { StatusCodes } = require("http-status-codes");
const Posts = require("../data.json");

module.exports.create = (req, res, next) => {
  const {
    title,
    direction,
    description,
    type,
    category,
    image,
    latitude,
    longitude,
  } = req.body;

  Posts.push({
    title,
    direction,
    description,
    type,
    category,
    image,
    latitude,
    longitude,
    author: req.currentUserId,
  });

  res.send(Posts)
};
module.exports.getPosts = (req, res, next) => {
  res.send(Posts);
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  const postId = Posts.find((post) => post.id === id);
  res.send(postId);
};
