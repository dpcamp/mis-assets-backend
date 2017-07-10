const express = require('express');
const mongoose = require('mongoose');
const Phone = require('../models/Phone');
const router = express.Router();

//phone POST route

router.route('/')
    .post((req, res) => {

        const phone = new Phone(req.body);

        phone.save((err, phone) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(phone);
        });
    });

// All User GET route

router.route('/')
    .get((req, res) => {

        Phone.find({}, (err, phones) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(phones)
        });

    });


// Single User GET route

router.route('/:id')
  .get((req, res) => {

    const _id = req.params.id;

    Phone.findOne({ _id }, (err, phone) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!phone) {
        res.status(404).json({ message: 'Phone not found.' });
      }

      res.json(phone);
    });
    
  });

// phone PUT route

router.route('/:id')
  .put((req, res) => {

    const _id = req.params.id;

    Phone.findOneAndUpdate({ _id },
      req.body,
      { new: true },
      (err, phone) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(phone);
    });

  });

// Phone DELETE route

router.route('/:id')
  .delete((req, res) => {

    const _id = req.params.id;

    Phone.findOneAndRemove({ _id }, (err, phone) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!phone) {
        res.status(404).json({ message: 'Phone not found.' });
      }
      res.json({ message: `Phone ${phone.number} deleted.` });
    });

  });

module.exports = router;