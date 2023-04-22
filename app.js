require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const passport = require("passport");
/* Db config */
require("./config/db.config");
require("./config/passport.config")
/* Config express middlewares */

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(logger("dev"));
app.use(express.json()); // Para poder tener req.body en peticiones de tipo application/json
app.use(passport.initialize())
/* Routes */

const routes = require("./config/routes.config");
app.use(routes);

/* Handle errors */

// Middleware para cuando no encuentra ruta
app.use((req, res, next) => {
  next(createError(StatusCodes.NOT_FOUND, "Route not found"));
});

// Middleware genérico de errores
app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(StatusCodes.BAD_REQUEST, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(StatusCodes.NOT_FOUND, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(StatusCodes.BAD_REQUEST, "Already exists");
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(StatusCodes.UNAUTHORIZED, error)
  } else if (!error.status) {
    error = createError(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const data = {};

  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce((errors, key) => {
        return {
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        };
      }, {})
    : undefined;

  res.status(error.status).json(data);
});

/* Server listening */

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App initialized at port ${port}`);
});
