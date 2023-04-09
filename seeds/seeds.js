const mongoose = require("mongoose");
const Post = require("../models/Post.model");

require("../config/db.config");

const Posts = require("./data.json");

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.info("Db.config has been cleared");

      return Post.create(Posts);
    })
    .then((createdPosts) => {
      createdPosts.forEach((product) => {
        console.log(`Product with name ${product.name} has been created`);
      });
      console.log(
        `A total of ${createdPosts.length} Posts has been created`
      );
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.connection.close(function () {
        console.log("Mongoose disconnected");
        process.exit(0);
      });
    });
});