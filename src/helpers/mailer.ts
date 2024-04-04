import nodemailer from "nodemailer";
import User from "@/models/user-model";
import bcryptjs from "bcryptjs";
import { ConnectionStates } from "mongoose";

type TSendMail = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
};

export const sendMail = async ({ email, emailType, userId }: TSendMail) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 12);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "nextauth@learn.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verify-email?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.
      <br/>
      ${process.env.DOMAIN}/verify-email?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
