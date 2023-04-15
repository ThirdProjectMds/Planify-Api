const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_LENGTH,
} = require("../config/errorMessages");

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    lastName: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [EMAIL_PATTERN, INVALID_EMAIL],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, INVALID_LENGTH],
    },
    avatar: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.virtual("likes", {
  ref: "Like",
  foreignField: "author",
  localField: "_id",
  justOne: false,
});
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
  justOne: false,
});

userSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'author',
  localField: '_id',
  justOne: false
})

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
