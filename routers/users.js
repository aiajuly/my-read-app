const express = require('express');
const router = express.Router();
const userController =  require('../controllers/users');
const {wrapAsync} = require('../utils/errors/errors')
const passport = require('passport')


router.get('/register', userController.newUserForm);
router.post('/register', wrapAsync((userController.createAndLogInUser)));
router.get('/login', userController.loginForm);
router.post('/login', passport.authenticate('local', {  failureMessage: true, failureFlash: true, failureRedirect: '/login' }), userController.login)
router.get('/logout', userController.logout)


module.exports = router