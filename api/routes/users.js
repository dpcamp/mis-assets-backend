const express   = require('express'),
router          = express.Router(),

sql             = require('mssql')
request         = new sql.Request();
;

//user POST route

router.route('/')
    .post((req, res) => {
    
     //query the DB
     const query = `INSERT INTO [Users] (first_name, last_name, username, email, phone) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.username}', '${req.body.email}', '${req.body.phone}')`;
     request.query(query, (err,record) => {
        if(record.rowsAffected == "0")
        { 
          res.json({message: 'record not found'})
        }
        else if(err) {
            console.log(`Error while querying database :- ${err}`);
            res.send(err);         
        }
        else {
            res.json({message: "User created."});
        }
     
    })


    });

//All Users GET route

router.route('/')
    .get((req, res) => {

     //query the DB
     const query = 'select * from [users] left outer join [phones] on user_id=owner_id;';
     request.query(query, (err,record) => {
        if(err) {
            console.log(`Error while querying database :- ${err}`);
            res.send(err);         
        }
        else {
            res.json(record.recordset);
        }
     })

    });

// Single User GET route

router.route('/:id')
  .get((req, res) => {

    const user_id = req.params.id;

     //query the DB
     const query = `select * from [users] left outer join [phones] on user_id=owner_id where user_id = '${user_id}'`;
     request.query(query, (err,record) => {
        if(record.rowsAffected == "0")
        { 
          res.json({message: 'record not found'})
        }
        else if(err) {
            console.log(`Error while querying database :- ${err}`);
            res.send(err);         
        }
        else {
            res.json(record.recordset[0]);
        }
     })
    
  });

//user PUT route

router.route('/:id')
  .put((req, res) => {

    const user_id = req.params.id;

    //query the DB
    const query = `UPDATE [Users] SET first_name= '${req.body.first_name}', last_name= '${req.body.last_name}', username= '${req.body.username}', email= '${req.body.email}', phone= '${req.body.phone}' where user_id = '${user_id}'`;
    request.query(query, (err,record) => {
      if(record.rowsAffected == "0")
      { 
        res.json({message: 'record not found'})
      }
      else if(err) {
          console.log(`Error while querying database :- ${err}`);
          res.send(err);         
      }
      else {
          res.json({message: 'user updated'});
      }
    })

  });

//User DELETE route

router.route('/:id')
  .delete((req, res) => {

    const user_id = req.params.id;

    //query the DB
    const query = `delete from [Users] where user_id = '${user_id}'`;
    request.query(query, (err,record) => {
      if(record.rowsAffected == "0")
      { 
        res.json({message: 'record not found'})
      }
      else if(err) {
          console.log(`Error while querying database :- ${err}`);
          res.send(err);         
      }
      else {
        res.json({ message: `User deleted.` });
      }
    })



  });

module.exports = router;