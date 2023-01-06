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
const cardsQueries = require('./db/queries/cards');
const db = require('./db/connection')
// const database = require('database')
const cardsRoutes = require('./routes/cards');

//const db = require('./database');
const adminPage = require('./routes/admin');

//const database = require('database')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/api/cards', cardsRoutes);

// app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
// app.use('/liked', likedRoutes);

// User Router
const userRouter = express.Router();
userRoutes(userRouter, db);
app.use("/users", userRouter);

// User favorites
const favorites = express.Router();
likedRoutes(favorites, db);
app.use("/likes", favorites);

// admin view
const adminView = express.Router();
adminPage(adminView, db);
app.use("/admin", adminView);



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// app.get('/', (req, res) => {
//   const testVar = {test: thing}
//   res.render('index', testVar);
// });


// app.get('/', (req, res) => {
//   console.log("getAllCards");
//   cardsQueries.getAllCards(req.query, 20)
//   .then(cards => {
//     const tempateVar = {cards: cards, userID: true}
//     res.render('index', tempateVar);
//   // console.log("getAllCards");
//   // db.getAllCards(req.query, 20)
//   // .then(cards => {
//   //   const tempateVar = {cards: cards}
//     // res.send({cards})
//   // })
//   // .catch(e => {
//   //   console.error(e);
//   //   res.send(e)
// });
// });

app.get('/', (req, res) => {
  console.log("getAllCards");
  if(!req.session.user_id){req.session.user_id = 'Guest'} // ducttape fix
    const tempateVar = {
      userID: req.session.user_id
    };
  // cardsQueries.getAllCards(req.query, 20)
  cardsQueries.getAllCards(0, 20)
  // .then(cards => {
  //   // const tempateVar = {cards: cards, userID: true}
    res.render('index', tempateVar);
// });
});

// app.get("/liked", (req, res) => {
//   res.render('liked');
// });

app.get('/adminPage', (req, res) => {
  cardsQueries.getAllCards(0, 20)
  .then(cards => {
    const tempateVar = {
      cards: cards,
      userID: req.session.user_id
    };
      res.render('adminPage', tempateVar);
    });
  });

  app.post("/add", (req, res) => {


    console.log("req.body ➤", req.body);
    dbQuery.query(`INSERT INTO cards (title, thumbnail_photo_url, cost) VALUES ($1, $2, $3);`, [req.body.title, req.body.thumbnail_photo_url, req.body.cost])
    res.send({
      message: "card added"
    })
  });


app.get("/login", (req, res) => {
  res.render('login');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


