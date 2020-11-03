//Dependencies

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Items = require('./models/items.js');
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
  Item.find({}, (error, allItems) => {
    res.render('index.ejs', {
      data: allItems
    });
  });
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
    // console.log(req.body, createdItem);
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

//seed
app.get('/seed', (req, res) => {
  Items.create([{
      name: 'Laptop',
      description: 'Performance meets versatility. From intensive video and graphics files to high-octane gaming, the most powerful Surface laptop yet combines speed, graphics, and long battery life with the versatility of a laptop, tablet, and portable studio. Tackle your biggest demands with quadcore powered 10th Gen Intel Core processors, blazing NVIDIA graphics, and high-resolution PixelSense Display designed for Surface Pen and touch.',
      img: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6408/6408385_sd.jpg;maxHeight=1000;maxWidth=1000',
      price: 2799.99,
      category: 'Electronics',
      make: 'Microsoft',
      model: 'Surface Book 2',
      item_id: '6408385',
      location: 'Living Room',
      units: 1,
      insured: true
    },
    {
      name: 'Desk',
      description: 'A clean design that’s just as beautiful on all sides – place it free-standing in the room or against a wall with cables neatly hidden inside. Use with other MALM products in the series for a unified look.',
      img: 'https://www.ikea.com/us/en/images/products/malm-desk-black-brown__0735973_PE740307_S5.JPG',
      price: 179,
      category: 'Furniture',
      make: 'Ikea',
      model: 'MALM',
      item_id: '002.141.57',
      location: 'Office',
      units: 1,
      insured: false
    },
    {
      name: 'Lamp',
      description: 'Combining acacia wood and earthenware for visual intrigue, our Wood & Ceramic Table Lamp brings a modern-meets-rustic aesthetic to any nightstand, side table or desk.',
      img: 'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202045/0022/img82o.jpg',
      price: 170.05,
      category: 'Furniture',
      make: 'West Elm',
      model: '',
      item_id: '7498152',
      location: 'Living Room',
      units: 2,
      insured: false
    },
    {
      name: 'Blue Yeti USB Microphone',
      description: 'Create unparalleled recordings directly on your computer with Blue Microphone’s Yeti USB Microphone. Yeti uses Blue’s proprietary tri-capsule technology to produce pristine, studio-quality recordings with ease. With an all-new total blackout finish, Blackout Yeti adds style and energy to your recording, gaming or broadcasting setup.',
      img: 'https://target.scene7.com/is/image/Target/GUEST_c78cdfdd-af5b-4931-ba8b-b8aef10d2fcb?fmt=webp&wid=1400&qlt=80',
      price: 129.99,
      category: 'Electronics',
      make: 'Yeti',
      model: 'Blue',
      item_id: '836213002070',
      location: 'Office',
      units: 1,
      insured: false
    }
  ], (err, data) => {
    res.redirect('/');
  });
});



// show
app.get('/:id', (req, res) => {
  Item.findById(req.params.id, (error, foundItem) => {
    res.render('show.ejs', {
      data: foundItem
    });
  });
});

// delete
app.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/');
});
});




//Listener

app.listen(PORT, () => console.log('Listening on port:', PORT));