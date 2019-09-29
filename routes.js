const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");

router.get("/", (request, response, next) => {
  return response.status(200).json({
    message: "Mail Service is Working!"
  });
});

router.post("/send", (request, response, next) => {
  let domain = request.headers.host;

  let senderName = request.body.contactFormName || `Mail from ${domain}`;
  let senderEmail = request.body.contactFormEmail || null;
  let messageSubject = request.body.contactFormSubjects || "Information";
  let messageText = request.body.contactFormMessage || null;
  let copyToSender = request.body.contactFormCopy || false;

  if (!domain) {
    return response.status(401).json({ message: "No domain found" });
  } else if (!senderEmail) {
    return response.status(400).json({ message: "Email is required." });
  } else if (!messageText) {
    return response.status(400).json({ message: "Message is required." });
  }

  let mailOptions;
  let transporterOptions = {
    host: "smtp.gmail.com",
    provider: "gmail",
    port: 465,
    secure: true,
    auth: {},
    tls: {
      rejectUnauthorized: false
    }
  };

  switch (domain) {
    case process.env.HOST_T:
      mailOptions = {
        to: [process.env.MAIL_T],
        from: senderName,
        subject: messageSubject,
        text: messageText,
        replyTo: senderEmail
      };
      transporterOptions.auth.user = process.env.MAIL_T;
      transporterOptions.auth.pass = process.env.PASS_T;
      break;
    case process.env.HOST_P:
      mailOptions = {
        to: [process.env.MAIL_P],
        from: senderName,
        subject: messageSubject,
        text: messageText,
        replyTo: senderEmail
      };
      transporterOptions.auth.user = process.env.MAIL_P;
      transporterOptions.auth.pass = process.env.PASS_P;
      break;
    // default:
    //   mailOptions = {
    //     to: ["anastasios.theodosiou@gmail.com"],
    //     from: senderName,
    //     subject: messageSubject,
    //     text: messageText,
    //     replyTo: senderEmail
    //   };
    //   transporterOptions.auth.user = process.env.MAIL_T;
    //   transporterOptions.auth.pass = process.env.PASS_T;
    //   break;
  }

  let transporter = nodeMailer.createTransport(transporterOptions);

  if (copyToSender) mailOptions.to.push(senderEmail);

  transporter.sendMail(mailOptions, (error, res) => {
    if (error) {
      return response.status(400).json({ message: "Something went wrong!" });
    } else {
      console.log(JSON.stringify(res, null, 1));
      return response.status(200).json({ message: "Mail sent!" });
    }
  });
});

module.exports = router;
