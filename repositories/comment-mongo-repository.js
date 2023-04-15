const Comments = require("../models/Comment.model")


module.exports.create =  async (comment) => {
  Comments.create(comment);
}