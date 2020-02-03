const express = require('express'),
  router = express.Router(),
  models = require('../models')
  ;

  UserForm = models.user_form
  Op = models.Sequelize.Op
  pCount = ''
  const operatorsAliases = {
    $like: Op.like,
    $not: Op.not
  }

  router.route('/')
  .post((req, res) => {
    console.log(JSON.stringify(req.body))
    const subEmail = ''; 
    UserForm.create(req.body)
    .then (function (form){
    console.log(`user data: ${JSON.stringify(form)}`)
    UserForm.findAll({
      where: {status: 'pending'}
    })
    .then(function(res) {
      this.pCount = res.length
    })
    UserForm.findByPk(form.id, {      
      include: 
      {model: models.users,
        as: 'submit_user'
      }
      })
        .then (function (user){
        
          console.log(this.pCount)
        res.status(200).json({pending_count: this.pCount, data: user})
      })
    })
      .catch(function (err) {
        res.status(500).json(err)
      })


  });
  router.route('/')
  .get((req, res) => {
    let queryParams = {};
    if (req.query.get_status) {
      queryParams = {status: req.query.get_status}
    }
    if (req.query.submitted_by){
    queryParams = {submitted_by: req.query.submitted_by}
    }
    if (req.query.submitted_by && req.query.get_status) {
      queryParams = {status: req.query.get_status, submitted_by: req.query.submitted_by}
    }
    console.log (queryParams)
    //console.log(JSON.stringify(req.body))
    UserForm.findAll({
      where: queryParams,
      include: [
        {model: models.users,
          as: 'submit_user'
        },
        {model: models.users,
          as: 'create_user'
        }
      ]
    })
      .then(function (form) {
        
        if(req.query.get_status){
          let pCount = form.length
          res.status(200).json({pending_count: pCount, data: form })
        } else {
          res.status(200).json({data: form })
        }
        
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

      console.log(JSON.stringify(form))
        UserForm.findAll({
          where: {status: 'pending'}
        })
        .then(function(res) {
          this.pCount = res.length
        })
      UserForm.findByPk(id, {      
        include: 
        {model: models.users,
          as: 'submit_user'
        }
        })
          .then (function (user){
          res.status(200).json({message: `user id: ${user.id} updated!`, pending_count: this.pCount, data: user})
        })
      })
        .catch(function (err) {
          res.status(500).json(err)
        })
  


    
    
      });
module.exports = router;