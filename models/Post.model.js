const mongoose = require("mongoose");

const { REQUIRED_FIELD } = require('../config/errorMessages');


const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, REQUIRED_FIELD],
      
    },
    title: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    direction: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },

    description: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    type: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },

    category: {
      type: String,
      // required: [true, REQUIRED_FIELD],
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
  }
)
// postSchema.virtual('countLikes').get(function(){
//   return this.likes.length
// })

postSchema.virtual("likes", {
  ref: "Like",
  foreignField: "postId",
  localField: "_id",
  justOne: false,
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'postId',
  localField: '_id',
  justOne: false
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;