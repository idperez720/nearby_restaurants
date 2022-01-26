// libraries
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
// views engine libraries
const exphbs = require('express-handlebars');


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
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));


// use engine
app.set('view engine', '.hbs');


// middlewares
app.use(session({
    secret: 'pgnodession',
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/// send message
app.use(flash());
app.use(morgan('dev'));

/// initialize sessions
app.use(passport.initialize());
app.use(passport.session());


// global variables
app.use((req, res, next) => {

    next();
});


// routes
app.use(require('./routes'));
app.use(require('./routes/auth'));


// start server

(async () => {

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

