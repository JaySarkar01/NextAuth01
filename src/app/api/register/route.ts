import User from "@/models/User";
import connect from "@/app/utils/db"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    // Parse the request body
    const { email, password }: { email: string; password: string } = await request.json();

    // Connect to the database
    await connect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use..." }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    return NextResponse.json({ message: "User is registered successfully!" }, { status: 200 });

  } catch (err) {
    console.error("Error in POST /register:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};