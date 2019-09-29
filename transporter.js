const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  provider: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "anastasios.theodosiou@gmail.com", // Enter here email address from which you want to send emails
    pass: "theodosiou91alex" // Enter here password for email account from which you want to send emails
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
