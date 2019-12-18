const express = require('express'),
  router = express.Router(),
  db = require('../db')
 ;

 let Computer = db.computer

  //All computers GET route

router.route('/')
  .get((req, res) => {
    let per_page = req.params.per_page;

    if (per_page == null) limit = null;
    else {
      limit = per_page;
    }
    let offset = 0;

    Computer.findAndCountAll({ 
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
        Computer.findAll({
          limit: limit,
          offset: offset,
          include: [
              {model: db.computerAttributes},
              {model: db.users} 
        ]
        })
          .then((computers) => {
            res.status(200).json({
              metadata: {
              page: page,
              per_page: limit,
              total: data.count,
              total_pages: pages
              },
              data: computers

            });
          })
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

//Single Computer GET route
router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;

    Computer.findByPk(
      id, {
        include: [
          { model: db.computerAttributes, 
            attributes: {
              exclude: ['computer_id']
            }
          },
          { model: db.users,
            through: {attributes: []} }]
      }

    )
      .then(function (user) {
        if (!user) {
          res.status(404).json({ message: `Computer: ${id} not found!` })
        }
        res.status(200).json(user);
      })
      .catch(function (err) {
        res.status(500).json(err);
      })

  });

module.exports = router;