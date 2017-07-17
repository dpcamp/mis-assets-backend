// create a new express router
const express       = require('express'),
  router            = express.Router(),
  mainController    = require('./controllers/main.controller')
  ;

// export router
module.exports = router;

// define routes

// main routes
router.get('/', mainController.showHome);

//user routes
//router.get('/users',    userController.showUsers);