const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const helpers = require('./helpers');

const users = require('../model/users');

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    // get user info to register

    const { fullname, email } = req.body;
    const newUserInfo = {
        username,
        email,
        password,
        fullname
    };

    // encrypt password
    newUserInfo.password = await helpers.encryptPassword(password);

    // save user in database
    try {
        const result = await users.create(newUserInfo);
        return done(null, result);
    } catch (error) {
        console.error(error);
    }


}));

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    // find user by username in database
    const rows = await users.findall({where: {username: username}});
    
    // password validation
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);

        if (validPassword) {
            done(null, user, req.flash('success', 'welcome ' + user.fullname));
        } else {
            done(null, false, req.flash('message', 'Password incorect, try again'));
        }
    } else {
        return done(null, false, req.flash('message', 'User does not exist'));
    }
}));


// serialize user data
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await users.findByPk(id);
    done(null, user);
});