const express = require('express'),
  router = express.Router(),
  models = require('../models')
  ;

  UserForm =models.user_forms

  router.route('/')
  .post((req, res) => {

    Phones.create(req.body)
      .then(function (form) {
        res.status(200).json(form)
      })
      .catch(function (err) {
        res.status(500).json(err)
      })


  });

  router.route('/:id')
  .get((req, res) => {

    UserForm.findByPk(req.params.id)
      .then(function (form) {
        if (!form) {
          res.status(404).json({ message: 'record not found!' })
        }
        res.status(200).json(form);
      })
      .catch(function (err) {
        res.status(500).json(err);
      })

  });


router.route('/:id')
.put((req, res) => {
  let id = req.params.id;


  UserForm.update(req.body, {
    where: {
      id: id
    }
  })

    .then(function (form) {

      res.status(200).json({ message: `form: ${form.id} updated!` });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});