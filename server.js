//Dependencies

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const itemsController = require('./controllers/items.js');
// app.use('/',itemsController); WOULD I NEED TO TELL THE MIDDLEWARE TO RUN WHEN IT HITS THE INDEX?
app.use(itemsController);



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
mongoose.connect('mongodb:localhost:27017/project2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
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




//Listener

app.listen(PORT, () => console.log('Listening on port:', PORT));