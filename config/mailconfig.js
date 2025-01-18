const nodemailer = require("nodemailer");
require("dotenv").config()
//creating instance not a function
try {
    exports.transporter =nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.MAIL_NAME,
          pass: process.env.PASS,
        },
      })
      console.log("nodemailer configuration is done")
    }
catch (error) {
    console.log("unable to configure with mail",error)
}

