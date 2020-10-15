
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');


const app = express();


//contact us nodemailer

app.use('/Client/HTML', express.static(path.join(__dirname, '/Client/HTML')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'ramachandiran1744@amdtians.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ramachandiran1744@amdtians.com', // generated ethereal user
        pass: 'Ramachandiran1744'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"amdt Contact mailer" < ramachandiran1744@amdtians.com>', // sender address
      to: 'ramachandiran1744@amdtians.com, rpraburaj7@gmail.com', // list of receivers
      subject: 'amdt Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));