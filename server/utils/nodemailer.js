const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({
  path: './env'
});

const sendMail = async ({ to, subject, text, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  // Connect with the SMTP server
  let transporter = await nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"NishLiving" <piyushanand2580@gmail.com>', // Sender address
    to, // List of receivers
    subject, // Subject line
    text, // Plain text body
    html, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};

module.exports = sendMail;