//Dependencies

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();


//Port

// Allow use of Heroku's port or your own local port, depending on the environment
// const PORT = process.env.PORT || 3000;
const PORT = 3000;


//Database

// How to connect to the database either via heroku or locally
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'project2';

// Connect to Mongo
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true
// });

// DATA

const Item = require('./models/items.js');

//mongoose
// mongoose.connect('mongodb:localhost:27017/project2', {useNewUrlParser: true, useUnifiedTopology: true}); 
// mongoose.connection.once('open', () => {
//   console.log('connected to mongo');
// });
const mongoURI = 'mongodb://localhost:27017/' + 'project2';
const db = mongoose.connection;

mongoose.connect(mongoURI);

// Deprecation warning
mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('the connection with mongod is established');
});




// Error / success
// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
// db.on('disconnected', () => console.log('mongo disconnected'));
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));



// open the connection to mongo
// db.on('open', () => {});


//MIDDLEWARE


//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({
  extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form




// Routes

//localhost:3000
app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log(`this is the index route`);
});

// new
app.get('/new', (req, res) => {
  // res.send(`new route`);
  res.render('new.ejs');
  // console.log(`this is the new route`);
});

//create
app.post('/', (req, res) => {
  if (req.body.insured === 'on') {
    req.body.insured = true;
  } else {
    req.body.insured = false;
  }

  Item.create(req.body, (error, createdItem) => {
    res.send(createdItem);
    console.log(req.body, createdItem);
  });
  // res.redirect('/');
  
});

// update
app.put('/:id', (req, res) => {
  res.send(`update route`);
  console.log(`this is the update route`);
});

// edit
app.get('/:id/edit', (req, res) => {
  res.send(`edit route`);
  console.log(`this is the edit route`);
});

// show
app.get('/:id', (req, res, next) => {
  res.send(`show route`);
  console.log(`this is the show route`);
});

// delete
app.delete('/:id', (req, res) => {
  res.send(`delete route`);
  console.log(`this is the delete route`);
});


//Listener

app.listen(PORT, () => console.log('Listening on port:', PORT));