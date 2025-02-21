import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//console.log("MAIL_USER:", process.env.MAIL_USER); 
//console.log("MAIL_PASS:", process.env.MAIL_PASS);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sender = {
    email: process.env.MAIL_USER,
    name: "Tourist Platform Admin",
}

/*
async function main() {
  
  const info = await transporter.sendMail({
    from: '"SE Project" <aadhil2k4@gmail.com>', // sender address
    to: "brocklakssan@gmail.com", // list of receivers
    subject: "Test mail1", // Subject line
    html: "<b>Thevudiya Punda</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
*/