//DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const itemsController = require('./controllers/items.js');
const userController = require('./controllers/users_controller.js');
const sessionsController = require('./controllers/sessions_controller.js');
require('dotenv').config(); // gives server access to environment variables in .env file
const session = require('express-session');
const bcrypt = require('bcrypt');




//Port
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODBURI;
// const PORT = 3000;


//MIDDLEWARE
app.use(express.urlencoded({extended: true})); // populates req.body with parsed info from forms - if no data from forms will return an empty object {}. extended: false - does not allow nested objects in query strings
// app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method')); //use method override to allow POST, PUT and DELETE from a form
app.use(express.static('public')); //use public folder for static assets


//mongoose
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.use(itemsController);
app.use('/users', userController);

app.use('/sessions', sessionsController);
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);



const db = mongoose.connection;

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('mongo disconnected'));



//Listener

app.listen(PORT, () => console.log('Listening on port:', PORT));