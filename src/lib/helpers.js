// encryption library
const bcrypt = require('bcryptjs');

const helpers = {};


// password encryption
helpers.encryptPassword = async (password) => {

    // gen password encryption pattern
    const salt = await bcrypt.genSalt(10);

    // encrypt password
    const hash = await bcrypt.hash(password, salt);

    return hash;

};

// verify password
helpers.matchPassword = async (password, savePassword) => {
    try {
        return await bcrypt.compare(password, savePassword);
    } catch (error) {
        console.error(error);
    }
};


// verify if the user already is logged in
helpers.isLoggedIn = (req, res, next) => {

    // if the user is logged in then continue
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not logged in then redirect to sign in page
    req.flash('message', 'Log in first');
    return res.redirect('/signin');
};

// verify if the user is not logged in
helper.isNotLoggedIn = (req, res, next) => {

    // if the user is not logged in then continue
    if (!req.isAuthenticated()) {
        return next();
    }

    // if the user is logged in then redirect to the restaurants page
    return res.redirect('/restaurants');
};

module.exports = helpers;