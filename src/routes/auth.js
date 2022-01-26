const router = require('express').Router();
const passport = require('passport');


// signin routes
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', passport.authenticate('local.signin', {
    // if the authentication process is successful then redirect to the restaurants page
    successRedirect: '/restaurants',
    // if the authentication process is unsuccessful then redirect to the signin page
    failureRedirect: '/signin',
    failureFlash: true
}));



// signup routes
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    // if the authentication process is successful then redirect to the restaurants page
    successRedirect: '/restaurants',
    // if the authentication process is unsuccessful then redirect to the signin page
    failureRedirect: '/signup',
    failureFlash: true
}));

// logout route
router.get('logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
});



module.exports = router;