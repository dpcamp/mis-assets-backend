var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "grf-lw-ex1",
    port: 25,
    secure: false,
    auth: {
      user: "derek.campanile@vmsinc.org",
      pass: "QAZwsx123"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const misEmail = {
    from: `"MIS Employee form", "noreply@vmsinc.org"`,
    to: `derek.campanile@vmsinc.org`,
    subject: `New Hire`,
    html: `<h4>A new User as created</h4><p><a href="http://192.168.235.97:4200/users/onboard?id=${user.id}">Click here to view the form</a><p><BR>MIS Team`
  };
  const userEmail = {
    from: `"MIS Employee form", "noreply@vmsinc.org"`,
    to: `${user.email}`,
    subject: `New Hire`,
    html: `<h4>Your Form has been submitted</h4><p><a href="http://192.168.235.97:4200/users/onboard?id=${user.id}">Click here to view the form</a><p><BR>MIS Team`
  };
  transporter.sendMail(misEmail, callback); 
  transporter.sendMail(userEmail, callback); 
}





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendmail', function(req, res) {
  let user = req.body;
  sendMail(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
})

module.exports = router;
