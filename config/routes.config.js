const router = require('express').Router();
const fileUploader = require('./storage.config');
const musicUploader = require('./music-storage.config');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const beatsController = require('../controllers/beat.controller')
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

/* Beats */
router.post('/beats', musicUploader.single('beat'), /*fileUploader.single('image'),*/ beatsController.create);
router.get('/beats/:userId', beatsController.list);
router.get('/beat/:beatId', beatsController.getOneBeat);
router.post('/beat/edit/:id', fileUploader.single('image'), beatsController.editBeat);
router.delete("/beats/delete/:id", beatsController.deleteBeat);
// router.get("/beats/reviews/:id", beatsController.getReviews);

/* PAYMENTS */
// router.post("/create-payment-intent/reserve", paymentController.loadReservePaymentScreen);
//router.post("/create-payment-intent/bills", paymentController.loadBillsPaymentScreen);

module.exports = router;
