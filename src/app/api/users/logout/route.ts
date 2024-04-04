import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    const user = await User.findOne({ _id: id });

    const response = NextResponse.json({
      success: true,
      message: "Logout successfully",
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
