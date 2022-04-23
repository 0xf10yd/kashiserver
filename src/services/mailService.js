const nodemailer = require("nodemailer");
const senderEmail = process.env.EMAIL
const senderPassword = process.env.PASSWORD
  
const transactions = "transactions";
// e-mail message options
let mailOptions = {
  from: senderEmail,
  to: "0xf10yd@protonmail.com",
  subject: "Email from Node-App: A Test Message!",
  text: transactions
};

// e-mail transport configuration
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

module.exports = {
    transporter,
    mailOptions
};