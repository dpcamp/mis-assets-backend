const express = require('express'),
  router = express.Router(),
  db = require('../db')
  ;

  Users = db.users;

  //All phones GET route

router.route('/')
  .get((req, res) => {
    let per_page = req.param('per_page');

    if (per_page == null) limit = null;
    else {
      limit = per_page;
    }
    let offset = 0;

    Users.findAndCountAll({ limit: limit, offset: offset })
      .then((data) => {

        if (req.param('page') == null) page = 1;
        else {
          page = req.param('page');
        }

        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Users.findAll({
          limit: limit,
          offset: offset,
          include: db.phones
        })
          .then((users) => {
            res.status(200).json({
              metadata: {
              page: page,
              per_page: limit,
              total: data.count,
              total_pages: pages
              },
              data: users
            });
          })
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    let phone = req.params.Telephone.

    Phones.update(req.body, {
      where: {
        id: id
      }
    })

      .then(function (updatedUser) {

        res.status(200).json({ message: `phone ID: ${id} updated!` });
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });

  module.exports = router;