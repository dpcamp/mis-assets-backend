const express = require('express'),
  router = express.Router(),
  models = require('../models')
//  winston = require('winston')
  ;
//winston.add(winston.transports.File, { filename: 'logfile.log' });
//winston.level = 'debug';
//phone POST route

Phones = models.phones;
UserPhones = models.UserPhones;

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
    let perPage = req.query.per_page;

    if (perPage == null) limit = null;
    else {
      limit = parseInt(perPage);
    }
    let offset = 0;

    Phones.findAndCountAll({ 
      limit: limit, 
      offset: offset
     })
      .then((data) => {

        if (req.params.page == null) page = 1;
        else {
          page = req.params.page;
        }

        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Phones.findAll({
          limit: limit,
          offset: offset,
          include: [{ model: models.users,
            as: 'owners',
            through: {attributes: []}
          }]
        })
          .then((phones) => {
            res.status(200).json({
              metadata: {
              page: page,
              per_page: limit,
              total: data.count,
              total_pages: pages
              },
              data: phones

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

    Phones.findByPk(req.params.id)
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

  // Single Phone GET route

router.route('/getEXT/:ext')
.get((req, res) => {

  Phones.findAll({
    where:{
      extension: req.params.ext
    }
  })
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
    let id = req.params.id;


    Phones.update(req.body, {
      where: {
        id: id
      }
    })

      .then(function (newNumber) {

        res.status(200).json({ message: `phone ID: ${id} updated!` });
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

// Single Phone User Assignment GET route

router.route('/:id/users')
  .get((req, res) => {
    
    Phones.findByPk(req.params.id)
      .then(function (phone) {
        if (!phone) {
          res.status(404).json({ message: 'record not found!' })
        }
        phone.getOwners()
        .then(function (result) {
         res.status(200).json(result);
        })
        
      })
      .catch(function (err) {
        res.status(500).json({ error: `${err}`});
      })

  });

// Single Phone User Assignment POST route

router.route('/:id/users')
  .post((req, res) => {
    let users = req.body.UserSAMAccountName;

    Phones.findByPk(req.params.id)
      .then(function (phone) {
        if (!phone) {
          res.status(404).json({ message: 'record not found!' })
        }
        //winston.log('debug',phone)
        phone.setOwners([users])
        .then(associatedUsers => {
          res.status(200).json({ message: `${associatedUsers} added!`});
        })
        
      })
      .catch(function (err, phone) {
        res.status(500).json({ error: `${err}`});
      })

  });


module.exports = router;