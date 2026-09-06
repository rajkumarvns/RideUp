import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDb();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "email already exist!" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Registration error ${error}` },
      { status: 500 },
    );
  }
}
