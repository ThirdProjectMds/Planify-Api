const Posts = require("../models/Post.model");

module.exports.create = async (post) => {
  await Posts.create(post);
};

module.exports.getAll = async () => {
  return await Posts.find().populate('author', 'firstName avatar')
};
module.exports.get = async (id) => {
  return await Posts.findById(id).populate('author', 'firstName avatar')
};
