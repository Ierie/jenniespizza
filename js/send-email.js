const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-password' // replace with your password
  }
});

// setup email data with unicode symbols
let mailOptions = {
  from: 'your-email@gmail.com', // replace with your email
  to: 'recipient-email@example.com', // replace with recipient email
  subject: 'Welcome to My Website',
  text: 'Thank you for registering to My Website!'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});



