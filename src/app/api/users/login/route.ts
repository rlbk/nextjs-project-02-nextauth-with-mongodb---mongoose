import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "User doesn't exist with this email" },
        { status: 400 }
      );

    const matchedPassword = await bcryptjs.compare(password, user.password);
    if (!matchedPassword)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    const tokenData = { id: user._id, username: user.username };
    const token = await jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    const response = NextResponse.json({
      success: true,
      message: "Login success",
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
