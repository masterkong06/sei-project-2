const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');


// ROUTES

//index
router.get('/', (req, res) => {
  Item.find({}, (error, allItems) => {
    res.render('users/index.ejs', {
      data: allItems
    });
  });
});


// new
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
  console.log(res);
  // res.send('new user page');
});

//create
router.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser);
    res.redirect('users/index.ejs');
  });
});

// update
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
    res.redirect('users/index.ejs');
  });
});


module.exports = router;