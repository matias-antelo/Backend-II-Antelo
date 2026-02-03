import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILING_ACCOUNT,
    pass: process.env.MAILING_PASS
  }
});

export default transporter;