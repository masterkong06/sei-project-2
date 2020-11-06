const express = require('express');
const router = express.Router();
const Item = require('../models/items.js');



// Routes

//localhost:3000
router.get('/', (req, res) => {
  Item.find({}, (error, allItems) => {
    res.render('index.ejs', {
      data: allItems,
      currentUser: req.session.currentUser
    });
  });
});


//seed
router.get('/seed', (req, res) => {
  Item.create([{
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


// new
router.get('/new', (req, res) => {
  // res.send(`new route`);
  res.render('new.ejs', {currentUser: req.session.currentUser});
  // console.log(`this is the new route`);
});

//create
router.post('/', (req, res) => {
  if (req.body.insured === 'on') {
    req.body.insured = true;
  } else {
    req.body.insured = false;
  }
  Item.create(req.body, (error, createdItem) => {
    res.redirect('/');
  });
});



// edit
router.get('/:id/edit', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render('edit.ejs', {
      data: foundItem
    });
  });
});

// update
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    currentUser: req.session.currentUser
  }, (err, updatedItem) => {
    res.redirect('/');
  });
});


// show
router.get('/:id', (req, res) => {
  Item.findById(req.params.id, (error, foundItem) => {
    res.render('show.ejs', {
      data: foundItem,
      currentUser: req.session.currentUser
    });
  });
});

// delete
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, foundItem) => {
    res.redirect('/');
  });
});


module.exports = router;