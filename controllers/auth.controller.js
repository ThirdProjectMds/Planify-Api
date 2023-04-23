const User = require('../models/User.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const passport = require("passport");


module.exports.login = (req, res, next) => {
  const loginError = createError(StatusCodes.UNAUTHORIZED, 'Email or password incorrect');
  const { email, password } = req.body

  if (!email || !password) {
    return next(loginError);
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return next(loginError)
      }

      return user.checkPassword(password)
        .then(match => {
          if (!match) {
            return next(loginError)
          }

          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'test',
            {
              expiresIn: '1h'
            }
          )

          res.json({ accessToken: token })
        })
    })
    .catch(next)
}
module.exports.loginGoogle = (req, res, next) => {
  passport.authenticate("google-auth", (err, user, validations) => {
    if (err) {
      next(err);
    } else if (!user) {
      next(404, "No user found");
    } else {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.redirect(`${process.env.CORS_ORIGIN}/validation?callbackToken=${token}`);
    }
  })(req, res, next);
};
