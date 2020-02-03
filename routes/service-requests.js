const express = require('express'),
router = express.Router(),
models = require('../models')

ServiceRequests = models.serviceRequests;

router.route('/')
.get((req, res) => {
  let perPage = req.query.per_page;

  if (perPage == null) limit = null;
  else {
    limit = parseInt(perPage);
  }
  let offset = 0;

  ServiceRequests.findAndCountAll({ 
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
      ServiceRequests.findAll({
        limit: limit,
        offset: offset
      })
        .then((srs) => {
          res.status(200).json({
            metadata: {
            page: page,
            per_page: limit,
            total: data.count,
            total_pages: pages
            },
            data: srs

          });
        })
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Single SR GET route

router.route('/:id')
.get((req, res) => {

  ServiceRequests.findByPk(req.params.id)
    .then(function (sr) {
      if (!sr) {
        res.status(404).json({ message: 'record not found!' })
      }
      res.status(200).json(sr);
    })
    .catch(function (err) {
      res.status(500).json(err);
    })

});

module.exports = router;