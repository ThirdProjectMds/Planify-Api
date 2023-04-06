const { StatusCodes } = require("http-status-codes");
const postRepository = require("../repositories/post-mongo-repository");

module.exports.create = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
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

  await postRepository.create({
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
  res.send();
};

module.exports.getPosts = async (req, res, next) => {
  const posts = await postRepository.getAll();
  res.send(posts);
};

module.exports.detail = async (req, res, next) => {
  const { id } = req.params;
  const post = await postRepository.get(id);
  res.send(post);
};
