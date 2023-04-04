const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  value: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  object: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Object',
    required: true
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;