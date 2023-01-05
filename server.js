// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
// const methodOverride = require('method-override');
// const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

// ENCRYPTION
// const bcrypt = require('bcryptjs');

app.set('view engine', 'ejs');
// hello

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['process.env.KEY']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const likedRoutes = require('./routes/liked');
const db = require('./database');
const adminPage = require('./routes/admin');

//const database = require('database')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
// app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/liked', likedRoutes);

// User Router
const userRouter = express.Router();
userRoutes(userRouter, db);
app.use("/users", userRouter);

// User favorites
const favorites = express.Router();
likedRoutes(favorites, db);
app.use("/liked", favorites);

// admin view
const adminView = express.Router();
adminPage(adminView, db);
app.use("/users", adminView);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get('/', (req, res) => {
//   const testVar = {test: thing}
//   res.render('index', testVar);
// });
app.get('/', (req, res) => {
  console.log("getAllCards");
  db.getAllCards(req.query, 20)
  .then(cards => {
    const tempateVar = {
      cards: cards,
      userID: req.session.user_id
    };
    res.render('index', tempateVar);
    // res.send({cards})
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

app.get("/liked", (req, res) => {
  res.render('liked');
});

app.get('/adminPage', (req, res) => {
  db.getAllCards(req.query, 20)
  .then(cards => {
    const tempateVar = {
      cards: cards,
      userID: req.session.user_id
    };
      res.render('adminPage', tempateVar);
    });
  });


app.get("/login", (req, res) => {
  res.render('login');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


