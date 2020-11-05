//DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const userController = require('./controllers/users_controller.js');
app.use('/users', userController);
const bcrypt = require('bcrypt');


require('dotenv').config(); //makes variables in .env file available to server
//port
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODBURI;


//MIDDLEWARE

app.use(express.urlencoded({extended: true})); // populates req.body with parsed info from forms - if no data from forms will return an empty object {}extended: false - does not allow nested objects in query strings {{REVIEW}}

app.use(methodOverride('_method')); // use method override to allow POST, PUT and DELETE from a form
app.use(express.static('public'));

// mongoose middleware
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}); //Handle deprecation errors
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});


// sessions
app.use(
  session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false
  })
);

// const Item = require('./models/items.js');
const db = mongoose.connection;


// mongoose.connect(mongoURI);

// Deprecation warning
// mongoose.connect(MONGODBURI, {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, () => {
//   console.log('the connection with mongod is established');
// });

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('mongo disconnected'));

const itemsController = require('./controllers/items.js'); // app.use('/',itemsController); WOULD I NEED TO TELL THE MIDDLEWARE TO RUN WHEN IT HITS THE INDEX?
app.use(itemsController);



// app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project






//Listener

app.listen(PORT, () => console.log('Listening on port:', PORT));