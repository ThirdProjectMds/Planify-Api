const router = require("express").Router();
const usersController = require("../controllers/users.controllers");
const authController = require("../controllers/auth.controller");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/storage.config")


// Auth
router.post("/login", authController.login);

// User Routes
router.post("/register", usersController.create);
router.get("/users", usersController.list);
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.get("/users/:id", usersController.getUser);

// POST
const postV1BasePath = "/planify/v1/posts"

router.get(`${postV1BasePath}/:id`, postController.detail);
router.get(postV1BasePath, postController.getPosts);
router.post(postV1BasePath, authMiddleware.isAuthenticated, upload.single("image"), postController.create)
router.put(`${postV1BasePath}/:id`, authMiddleware.isAuthenticated, upload.single("image"), postController.update)
router.delete(`${postV1BasePath}/:id`, authMiddleware.isAuthenticated, postController.deletePost)
router.get(`${postV1BasePath}/:category`, postController.getCategory)


router.post(`${postV1BasePath}/:id/like`, authMiddleware.isAuthenticated, postController.createLike)
module.exports = router;
