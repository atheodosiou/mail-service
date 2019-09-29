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

  if (!request.body.recepient) {
    return response.status(400).json({ message: "No recepient found" });
  } else if (!senderEmail) {
    return response.status(400).json({ message: "Email is required." });
  } else if (!messageText) {
    return response.status(400).json({ message: "Message is required." });
  }

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

  let mailOptions = {
    to:
      request.body.recepient === "tasos"
        ? ["anastasios.theodosiou@gmail.com"]
        : ["padelis.theodosiou@gmail.com"],
    from: senderName,
    subject: messageSubject,
    text: messageText,
    replyTo: senderEmail
  };
  transporterOptions.auth.user =
    request.body.recepient === "tasos"
      ? process.env.MAIL_T
      : process.env.MAIL_P;
  transporterOptions.auth.pass =
    request.body.recepient === "tasos"
      ? process.env.PASS_T
      : process.env.PASS_P;

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
