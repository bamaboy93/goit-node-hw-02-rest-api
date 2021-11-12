const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: "bamaboy483@gmail.com" });
  }
}

class CreateSenderNodmailer {
  async send(msg) {
    const config = {
      host: "smtp.ukr.net",
      port: 465,
      secure: true,
      auth: {
        user: "nodemailer@ukr.net",
        pass: process.env.PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({ ...msg, from: "nodemailer@ukr.net" });
  }
}

module.exports = { CreateSenderSendGrid, CreateSenderNodmailer };
