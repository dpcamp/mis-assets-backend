const express = require('express'),
  router = express.Router(),
  db = require('../db')
  ;

  Users = db.users;
  UserPhones = db.UserPhones;

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
          include: [
            {model: db.phones,
              attributes:['id','full_number', 'location'],
              through: {attributes: []}
            },
              {model: db.computer
              },
              {
                model: db.serviceRequests,
                through: {attributes: []}
              }
          ]
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
//Single User GET rout
router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;

    Users.findById(id)
      .then(function (user) {
        if (!user) {
          res.status(404).json({ message: `User: ${id} not found!` })
        }
        res.status(200).json(user);
      })
      .catch(function (err) {
        res.status(500).json(err);
      })

  });

// Single User->Phone Assignment GET route

router.route('/:id/phones')
  .get((req, res) => {
    
    Users.findById(req.params.id)
      .then(function (user) {
        if (!user) {
          res.status(404).json({ message: 'record not found!' })
        }
        user.getPhones()
        .then(function (result) {
          res.status(200).json(result);
        })
        
      })
      .catch(function (err) {
        res.status(500).json({message: `An error occured: ${err}`});
      })

  });

// Single User->Phone Assignment POST route

router.route('/:id/phones')
  .post((req, res) => {
    let phones = req.body.phoneID;
    
    Users.findById(req.params.id)
      .then(function (user) {
        if (!user) {
          res.status(404).json({ message: 'record not found!' })
        }
        user.setPhones([phones])
        .then(associatedPhones => {
          res.status(200).json({ message: `${associatedPhones} added!`});
        })
        
      })
      .catch(function (err) {
        res.status(500).json(err);
      })

  });

  module.exports = router;