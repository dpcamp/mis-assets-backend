const express = require('express'),
  router = express.Router(),
  model = require('../models/phones')
  ;

//phone POST route

Phones = model.Phones;

router.route('/')
  .post((req, res) => {

    Phones.create(req.body)
      .then(function (newPhone) {
        res.status(200).json(newPhone)
      })
      .catch(function (err) {
        res.status(500).json(err)
      })


  });

//All phones GET route

router.route('/')
  .get((req, res) => {
    let per_page = req.param('per_page');

    if (per_page == null) limit = 10;
    else {
      limit = per_page;
    }
    let offset = 0;

    Phones.findAndCountAll({ limit: limit, offset: offset })
      .then((data) => {

        if (req.param('page') == null) page = 1;
        else {
          page = req.param('page');
        }

        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Phones.findAll({
          limit: limit,
          offset: offset,
        })
          .then((phones) => {
            res.status(200).json({
              page: page,
              per_page: limit,
              total: data.count,
              total_pages:
              pages, data: phones
            });
          })
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

// Single Phone GET route

router.route('/:id')
  .get((req, res) => {

    Phones.findById(req.params.id)
      .then(function (phone) {
        if (!phone) {
          res.status(404).json({ message: 'record not found!' })
        }
        res.status(200).json(phone);
      })
      .catch(function (err) {
        res.status(500).json(err);
      })

  });

//phone PUT route

router.route('/:id')
  .put((req, res) => {
    Phones.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function (updatedRecords) {
        res.status(200).json({ message: `${updatedRecords} record(s) updated!` });
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });

//Phone DELETE route

router.route('/:id')
  .delete((req, res) => {

    Phones.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (deletedRecords) {
        res.status(200).json({ message: `${deletedRecords} record(s) deleted!` });
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });

module.exports = router;