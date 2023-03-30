const router = require('express').Router();
const usersController = require('../controllers/users.controllers');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Auth 
router.post('/login', authController.login);


// User Routes
router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);




module.exports = router;