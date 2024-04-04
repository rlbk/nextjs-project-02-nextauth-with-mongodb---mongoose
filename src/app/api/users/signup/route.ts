import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/user-model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already exist with this email" },
        { status: 400 }
      );

    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // send verification email
    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      success: true,
      message: "User registered successfully.",
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
