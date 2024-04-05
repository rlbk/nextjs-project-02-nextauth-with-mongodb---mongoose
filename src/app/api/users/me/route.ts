import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/get-data-from-token";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user)
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );

    return NextResponse.json({ data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
