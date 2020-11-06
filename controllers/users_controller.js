//code from BuildMe2.md

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');




// ROUTES

//index
// router.get('/', (req, res) => {
//     res.render('users/index.ejs');
// });

// router.get('/', (req, res) => {
//   Item.find({}, (error, allItems) => {
//     res.render('users/index.ejs', {
//     });
//   });
// });

// new
router.get('/users/new', (req, res) => {
  // res.render('new.ejs', { currentUser: req.session.currentUser });
  res.render('new.ejs');
});

//create
router.post('/users', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser);
    res.redirect('/');
  });
});

// update
// router.put('/:id', (req, res) => {
//   Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
//     res.redirect('users/index.ejs');
//   });
// });


module.exports = router;

//https://git.generalassemb.ly/seir-9-21/student-resources/blob/master/2_full_stack_dev/w06d03/instructor_notes/BuildMe2.md