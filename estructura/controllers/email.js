const nodemailer = require('nodemailer');
const APP_EMAIL = process.env.APP_EMAIL;
const APP_EMAIL_PASS = process.env.APP_EMAIL_PASS;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  
  let mailOptions = {
    from: APP_EMAIL,
    to: "fedefarach22@gmail.com",
    subject: `Notificaciones de fullstack`,
    html: `Estamos probando como enviar mails.`,
  };
  
const sendMail = () => {
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        console.log(err)
    else
        console.log(info);
  });
}

module.exports = { sendMail }