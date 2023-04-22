const router = require('express').Router();
const fileUploader = require('./storage.config');
const musicUploader = require('./music-storage.config');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const beatsController = require('../controllers/beat.controller');
const commentsController = require('../controllers/comments.controller');
const paymentController = require('../controllers/payment.controller');

require("./passport.config");
const passport = require("passport");
const SCOPES = ["profile", "email"];

const authMiddleware = require('../middlewares/auth.middleware');

//home
router.get('/');

/* Auth */
router.post('/login', authController.login);
router.post('/register', usersController.create);
//Auth Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: SCOPES })
);
router.get(
  "/auth/google/callback",
  authController.loginGoogle
);


/* Users */
router.get('/users', usersController.list);
router.post('/users/edit', fileUploader.single('image'), usersController.edit);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);
router.get('/users/username/:username', usersController.getUserByUsername);


/* Beats */
router.post('/beats', musicUploader.single('beat'), beatsController.create);
router.get("/beats/top", beatsController.getTopBeats);
router.get('/beats/:userId', beatsController.list);
router.get('/beat/:beatId', beatsController.getOneBeat);
router.post('/beat/edit/:id', fileUploader.single('image'), beatsController.editBeat);
router.delete("/beats/delete/:id", beatsController.deleteBeat);
router.put("/beat/count/:id", beatsController.addCountPlayer);
router.get("/beats/count/:id", beatsController.beatsFromUser);
router.get("/search/:searchText", beatsController.resultsFromSearch);
router.get("/favorites/:id", beatsController.getFavorites)


/*comments and favorite*/
router.post("/beat/comments/:id", commentsController.createComment);
router.get("/beat/comments/:id", commentsController.getBeatComments);
router.delete("/beat/comments/:id", commentsController.deleteComment);
router.post('/beat/favorite/:id', commentsController.toggleFavorite);
router.post("/beat/favorite/one/:id", commentsController.getIsFavorited);

/* PAYMENTS */
router.post("/create-payment-intent/reserve", paymentController.loadReservePaymentScreen);
router.post("/create-payment-intent/bills", paymentController.loadBillsPaymentScreen);

module.exports = router;
