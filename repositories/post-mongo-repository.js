const Posts = require("../models/Post.model");


module.exports.create = async (post) => {
  await Posts.create(post);
};

module.exports.getAll = async () => {
  const post = await Posts.find().populate("author").populate("comments");
  return post
};
module.exports.get = async (id) => {
  return await Posts.findById(id).populate("author").populate({ path: 'comments', populate: 'author' })
};


module.exports.edit = async (id, post) => {
  const updatePost = await Posts.findByIdAndUpdate(
    id,
    { $set: post },
    { new: true }
  );
  return updatePost;
};

module.exports.delete = async (id) => {
  return await Posts.findByIdAndDelete(id)
}

module.exports.getPostByCategory = async (category) => {
  return await  Posts.find({ category: category })
}


