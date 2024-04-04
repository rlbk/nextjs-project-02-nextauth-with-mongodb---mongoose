import nodemailer from "nodemailer";

type TSendMail = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
};

export const sendMail = async ({ email, emailType, userId }: TSendMail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardmail.net",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });

    const mailOptions = {
      from: "example@example.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password",
      html: "Hello World",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
