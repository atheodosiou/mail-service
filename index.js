const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const dotenv = require("dotenv");
const port = 3000;
const bodyParser = require("body-parser");
// import bodyParser from 'body-parser';

dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   provider: "gmail",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "anastasios.theodosiou@gmail.com", // Enter here email address from which you want to send emails
//     pass: "theodosiou91alex" // Enter here password for email account from which you want to send emails
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", require("./routes"));

// app.post("/send", function(req, res) {
//   let senderName = req.body.contactFormName;
//   let senderEmail = req.body.contactFormEmail;
//   let messageSubject = req.body.contactFormSubjects;
//   let messageText = req.body.contactFormMessage;
//   let copyToSender = req.body.contactFormCopy;

//   let mailOptions = {
//     to: ["anastasios.theodosiou@gmail.com"], // Enter here the email address on which you want to send emails from your customers
//     from: senderName,
//     subject: messageSubject,
//     text: messageText,
//     replyTo: senderEmail
//   };

//   if (senderName === "") {
//     res.status(400);
//     res.send({
//       message: "Bad request"
//     });
//     return;
//   }

//   if (senderEmail === "") {
//     res.status(400);
//     res.send({
//       message: "Bad request"
//     });
//     return;
//   }

//   if (messageSubject === "") {
//     res.status(400);
//     res.send({
//       message: "Bad request"
//     });
//     return;
//   }

//   if (messageText === "") {
//     res.status(400);
//     res.send({
//       message: "Bad request"
//     });
//     return;
//   }

//   if (copyToSender) {
//     mailOptions.to.push(senderEmail);
//   }

//   transporter.sendMail(mailOptions, function(error, response) {
//     if (error) {
//       console.log(error);
//       res.end("error");
//     } else {
//       console.log("Message sent: ", response);
//       res.end("sent");
//     }
//   });
// });

app.listen(port, function() {
  console.log(`Server is up and running on port: ${port}`);
});