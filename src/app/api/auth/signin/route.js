import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    //  Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    //  Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email, hrId: user.hrId },
      process.env.JWT_SECRET, // Ensure this is set in .env.local
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return Response.json({ message: "Signin successful", token  }, { status: 200 });
  } catch (error) {
    console.error("Signin Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
