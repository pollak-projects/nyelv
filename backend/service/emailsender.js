import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: "nzsombips3@gmail.com",
    pass: "ifrb qvvz pjuh zqom",
  },
});


// async..await is not allowed in global scope, must use a wrapper
export async function Kuldes(useremail) {
  const randomPassword = await generateAndSetNewPassword(useremail);
  const user = await prisma.user.findUnique({
    where: {
      email: useremail,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const info = await transporter.sendMail({
    to: useremail,
    subject: "Jelszó-visszaállítás",
    text: "",
    html:
      "<div style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; width: 100%; max-width: 600px;margin: 0 auto;background-color: #ffffff;padding: 20px;border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);'>" +
      "<div style=' text-align: center; margin-bottom: 20px;'>" +
      "</div>" +
      "<div style='text-align: center; margin-bottom: 20px; color: #333;'>" +
      "<h2 style=' color: #000000;'>Elfelejtett jelszó</h2> <br>" +
      "<p>Kedves " + user.last_name + user.first_name + "!</p>" +
      "<p>Az új jelszó a profilodhoz: " + randomPassword + "</p>" +
      "<p> Ha nem te voltál akkor ezt az emailt hagyd figyelmen kívül.</p>" +
      "</div>" +
      "<div style='text-align: center; font-size: 12px; color: #777; margin-top: 20px;'>" +
      "<p>Üdvözlettel,</p>" +
      "<p>Polyglot csapata</p>" +
      "</div>" +
      "</div>",
  });

  console.log("Message sent: %s", info.messageId);
}

export async function generateAndSetNewPassword(useremail) {
  const user = await prisma.user.findUnique({
    where: {
      email: useremail,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const randomPassword = Math.random().toString(36).slice(-8);

  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  await prisma.user.update({
    where: {
      email: useremail,
    },
    data: {
      password: hashedPassword,
    },
  });

  return randomPassword;
}