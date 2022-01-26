// libraries
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
// views engine libraries



// session libraries
const session = require('express-session');
const sessionStore = require('express-session-sequelize')(session.Store);


// authentication libraries
const passport = require('passport');


// initialize server
const app = express();
require('./lib/passport');



// initialize database
const database = require('./database/users');
const sequelizeSessionStore = new sessionStore({
    db: database
});


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));



// engine settings



// use engine



// middlewares
app.use(session({
    secret: 'pgnodession',
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// send message
app.use(flash());
app.use(morgan('dev'));

// global variables
app.use((req, res, next) => {

    next();
});


// routes
app.use(require('./routes'));
app.use(require('./routes/auth'));


// start server

(async () =>{

    // sync database before starting server
    try {
        await database.sync(
            {force: false}
        );
        app.listen(app.get('port'), ()=>{
            console.log('listening on port '+ app.get('port'))
        });
    } catch (error) {
        console.log('error');
    }

})();

