const router = require('express').Router();
const fileUploader = require('./storage.config');
const musicUploader = require('./music-storage.config');

const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const beatsController = require('../controllers/beat.controller')


const authMiddleware = require('../middlewares/auth.middleware');

/* Auth */
router.post('/login', authController.login);
router.post('/register', usersController.create);

/* Users */
router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.post('/users/edit', fileUploader.single('image'), usersController.edit);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);


/* Beats */
router.post('/audio/upload', beatsController.create);

module.exports = router;
