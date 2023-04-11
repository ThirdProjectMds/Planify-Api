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
      required: [true, REQUIRED_FIELD],
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
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like', 
      
    }],
    // comments: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Comment'
    // }],
    // ratings: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Rating'
    // }]
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
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;