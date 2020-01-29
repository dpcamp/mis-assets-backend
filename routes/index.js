var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "grf-lw-ex1",
    port: 25,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  if(user.status === 'completed'){
    console.log(JSON.stringify(user))
    const misEmail = {
      from: `"IT Operations", "IT.Operations@vmsinc.org"`,
      to: `AccountSetUp@vmsinc.org`,
      cc: `${ user.stellar ? 'Josh.Glass@vmsinc.org': ''}`,
      subject: `New User Created: ${user.user_name}`,
      html: `<h4>A New User has been created</h4><p>Requested by: ${user.email} <p>Username: ${user.user_name}<p>password: <strong>Welcome1!</strong><p><strong>Additional accounts needed (copy account:${user.copy_user}):<br>${ user.onbase ? 'OnBase <br>': ''}${ user.stellar ? 'STELLAR <br>' : '' }${user.dwelling_live? 'DwellingLive <br>' : ''}<p><a href="${process.env.URL}/users/onboard?id=${user.id}">Click here to view the form for additional requirements</a><p><BR><strong>MIS Team</strong>`
    };
    const userEmail = {
      from: `"IT Operations", "IT.Operations@vmsinc.org"`,
      to: `${user.email}`,
      subject: `New Hire Account created.`,
      html: `<h4>Your Form request has been completed for ${user.first_name} ${user.last_name}</h4><p>Username: ${user.user_name}<p>password: <strong>Welcome1!</strong><p><strong>MIS Team</strong>`
    };
    transporter.sendMail(misEmail, callback); 
    transporter.sendMail(userEmail, callback); 
  }
  else{
  const misEmail = {
    from: `"IT Operations", "IT.Operations@vmsinc.org"`,
    to: `AccountSetUp@vmsinc.org`,
    subject: `New Hire Form has been submitted`,
    html: `<h4>A new hire form for ${user.first_name} ${user.last_name} has been submitted by ${user.email}.</h4><p><a href="${process.env.URL}/users/onboard?id=${user.id}">Click here to view the form</a><p><BR><strong>MIS Team</strong>`
  };
  const userEmail = {
    from: `"IT Operations", "IT.Operations@vmsinc.org"`,
    to: `${user.email}`,
    subject: `Thank you for your New Hire Form submission`,
    html: `<h4>Your Form for ${user.first_name} ${user.last_name} has been submitted</h4><p><a href="${process.env.URL}/users/onboard-status?submitted_by=${user.submitted_by}">Click here to check on the status.</a><p>You will recieve a follow-up email with the username and password when this request has been completed.<p><BR><strong>MIS Team</strong>`
  };
  transporter.sendMail(misEmail, callback); 
  transporter.sendMail(userEmail, callback); 
}
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
