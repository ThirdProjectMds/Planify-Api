const router = require("express").Router();
const usersController = require("../controllers/users.controllers");
const authController = require("../controllers/auth.controller");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/storage.config")


// Auth
router.post("/login", authController.login);

// User Routes
router.post("/users", usersController.create);
router.get("/users", usersController.list);
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.get("/users/:id", usersController.getUser);

// POST

router.get("/planify/v1/posts/:id", postController.detail);
router.get("/planify/v1/posts", postController.getPosts);
router.post("/planify/v1/posts", authMiddleware.isAuthenticated, upload.single("image"), postController.create)

module.exports = router;
