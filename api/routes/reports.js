const express = require('express'),
    router = express.Router(),
    db = require('../db')

sequelize = db.sequelize;

;

router.route('/SR')
    .get((req, res) => {
        let groupBy = req.query.group_by
        let beginDate = req.query.begin_date
        let endDate = req.query.end_date

        sequelize.query(`SRReport @GroupBy=${groupBy}, @BeginDate=${beginDate}, @EndDate=${endDate} `, { type: sequelize.QueryTypes.SELECT})
            .then((data) => {
                res.status(200).json({
                    data: data

                });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });

module.exports = router;