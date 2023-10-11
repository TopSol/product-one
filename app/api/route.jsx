const nodemailer = require('nodemailer');

async function sendEmail({mailData}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "muhammadwaqar7782@gmail.com",
      pass: 'bvcwkxoktifxoqij' 
    }
  });

  const mailOptions = {
    from: "muhammadwaqar7782@gmail.com",
    to: "",
    subject:"",
    text:""
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent:', mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
