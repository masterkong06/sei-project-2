//code from BuildMe3.md
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/sessions/new', (req, res) => {
  // res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
  res.render('sessions/new.ejs');
});

router.post('/sessions', (req, res) => {

  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('oops the db had a problem');
    } else if (!foundUser) {
      res.send('<a  href="/">Sorry, no user found </a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
        res.send('<a href="/"> password does not match </a>');
      }
    }
  });
});

router.delete('/sessions', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;



//https://git.generalassemb.ly/seir-9-21/student-resources/blob/master/2_full_stack_dev/w06d03/instructor_notes/BuildMe3.md