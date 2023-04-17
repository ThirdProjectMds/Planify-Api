const Comments = require("../models/Comment.model")


module.exports.create =  async (comment) => {
  Comments.create(comment);
}

module.exports.editComment = async (id, comment) => {
  console.log(id, comment, "hola");
  const updateComment = await Comments.findByIdAndUpdate(
    id, 
    { $set: comment },
    { new: true }
  );
  return updateComment;
}

module.exports.delete = async (id) => {
  return await Comments.findByIdAndDelete(id)
}
