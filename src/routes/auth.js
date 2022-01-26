const router = require('express').Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/helpers');


// signin routes
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, passport.authenticate('local.signin', {
    // if the authentication process is successful then redirect to the restaurants page
    successRedirect: '/restaurants',
    // if the authentication process is unsuccessful then redirect to the signin page
    failureRedirect: '/signin',
    failureFlash: true
}));



// signup routes
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    // if the authentication process is successful then redirect to the restaurants page
    successRedirect: '/restaurants',
    // if the authentication process is unsuccessful then redirect to the signin page
    failureRedirect: '/signup',
    failureFlash: true
}));

// logout route
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});



module.exports = router;