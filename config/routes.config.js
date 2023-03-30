const router = require('express').Router();
const usersController = require('../controllers/users.controllers');
const authController = require('../controllers/auth.controller');
// User Routes
router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/:id', usersController.getUser);


// Auth 



module.exports = router;