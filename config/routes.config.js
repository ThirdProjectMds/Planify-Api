const router = require("express").Router();
const usersController = require("../controllers/users.controllers");
const authController = require("../controllers/auth.controller");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/storage.config");
const passport = require("passport")
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];
// Auth
router.post("/login", authController.login);
router.get(
  "/api/login/google",
  passport.authenticate("google-auth", { scope: GOOGLE_SCOPES })
);
router.get(
  "/api/auth/google/callback", 
  authController.loginGoogle
);

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
const postV1BasePath = "/planify/v1/posts";

router.get(`${postV1BasePath}/:id`, postController.detail);
router.get(postV1BasePath, postController.getPosts);
router.post(
  postV1BasePath,
  authMiddleware.isAuthenticated,
  upload.single("image"),
  postController.create
);
router.put(
  `${postV1BasePath}/:id`,
  authMiddleware.isAuthenticated,
  upload.single("image"),
  postController.update
);
router.delete(
  `${postV1BasePath}/:id`,
  authMiddleware.isAuthenticated,
  postController.deletePost
);
router.get(`${postV1BasePath}/:category`, postController.getCategory);
router.get(
  `${postV1BasePath}/posts/me`,
  authMiddleware.isAuthenticated,
  postController.getMyPosts
);

// like
router.post(
  `${postV1BasePath}/:id/like`,
  authMiddleware.isAuthenticated,
  postController.createLike
);
router.get(
  `${postV1BasePath}/likes/me`,
  authMiddleware.isAuthenticated,
  postController.getMyLikedPosts
);
router.delete(
  `${postV1BasePath}/:id/like`,
  authMiddleware.isAuthenticated,
  postController.deleteLike
);

// comment
router.post(
  `${postV1BasePath}/:id/comment`,
  authMiddleware.isAuthenticated,
  postController.createComment
);
router.get(`${postV1BasePath}/:id/comments`, postController.getComments);
router.put(
  `${postV1BasePath}/comment/:commentId/edit`,
  authMiddleware.isAuthenticated,
  postController.editCommentPost
);
router.delete(
  `${postV1BasePath}/:id/comment`,
  authMiddleware.isAuthenticated,
  postController.deleteCommentPost
);

module.exports = router;
