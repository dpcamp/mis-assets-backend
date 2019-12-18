const express = require('express'),
  router = express.Router(),
  models = require('../models')
  ;

  Users = models.users;
  UserPhones = models.UserPhones;

  //All phones GET route

router.route('/')
  .get((req, res) => {
    let per_page = req.params.per_page;

    if (per_page == null) limit = null;
    else {
      limit = per_page;
    }
    let offset = 0;

    Users.findAndCountAll({ limit: limit, offset: offset })
      .then((data) => {

        if (req.params.page == null) page = 1;
        else {
          page = req.params.page;
        }

        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Users.findAll({
          limit: limit,
          offset: offset,
          include: [
            {model: models.phones,
              attributes:['id','full_number', 'extension', 'location'],
              through: {attributes: []}
            },
              {model: models.computer
              },
              {
                model: models.serviceRequests,
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
//Single User GET route
router.route('/:id')
  .get((req, res) => {

    Users.findOne({ 
      where: {
      user_name: req.params.id
    },
    include: [
            {model: models.phones,
              attributes:['id','full_number', 'extension', 'location'],
              through: {attributes: []}
            },
              {model: models.computer
              },
              {
                model: models.serviceRequests,
                through: {attributes: []}
              }
          ] })
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

//Users By Extension GET route
router.route('/ext/:id')
  .get((req, res) => {

    Users.findAll({ 
    include: [
            {model: models.phones,
              where: {extension: req.params.id},
              attributes:['id','full_number', 'extension', 'location'],
              through: {attributes: []}
            },
              {model: models.computer
              },
              {
                model: models.serviceRequests,
                through: {attributes: []}
              }
          ] })
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
    
    Users.findByPk(req.params.id)
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