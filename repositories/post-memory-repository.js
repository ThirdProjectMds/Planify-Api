const Posts = require("../data.json");

module.exports.create = async (post) => {
  Posts.push(post);
};

module.exports.getAll = async () => {
  return Posts;
};

module.exports.get = async (id) => {
  return Posts.find((post) => post.id === id);
};
