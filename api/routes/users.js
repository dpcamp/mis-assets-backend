const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

//user POST route

router.route('/')
    .post((req, res) => {

        const user = new User(req.body);

        user.save((err, user) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(user);
        });
    });

//All Users GET route

router.route('/')
    .get((req, res) => {

        User.find({}, (err, users) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(users)
        });

    });

// Single User GET route

router.route('/:id')
  .get((req, res) => {

    const _id = req.params.id;

    User.findOne({ _id }, (err, user) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
      }

      res.json(user);
    });
    
  });

//user PUT route

router.route('/:id')
  .put((req, res) => {

    const _id = req.params.id;

    User.findOneAndUpdate({ _id },
      req.body,
      { new: true },
      (err, user) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(user);
    });

  });

//User DELETE route

router.route('/:id')
  .delete((req, res) => {

    const _id = req.params.id;

    User.findOneAndRemove({ _id }, (err, user) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!user) {
        res.status(404).json({ message: 'Contact not found.' });
      }
      res.json({ message: `User ${user.first_name} deleted.` });
    });

  });

module.exports = router;