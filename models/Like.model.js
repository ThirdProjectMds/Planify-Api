const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;