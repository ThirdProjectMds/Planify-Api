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

module.exports.update = async (req, res, next) => {
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
  const { id } = req.params;
  await postRepository.edit(id, {
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

module.exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  await postRepository.delete(id);
  res.send();
};

module.exports.getCategory = async (req, res, next) => {
  const { category } = req.params;
  await postRepository.getPostByCategory(category);
  res.send();
};

module.exports.createLike = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.currentUserId;

  const post = await postRepository.get(id);

  const hasLiked = post.likes.includes(userId);

  if (hasLiked) {
    post.likes = post.likes.filter(
      (like) => like.toString() !== userId.toString()
    );
  } else {
    post.likes.push(userId);
  }
  await post.save();
  const likeCount = post.likes.length;
  console.log(likeCount);
  res.send({ likeCount });
};
