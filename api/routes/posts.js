const express   = require('express'),
router          = express.Router(),
posts           = require('../models/posts')
;


router.route('/')
    .get((req, res) => {

    posts.Posts.findAll({}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

    });

module.exports = router;