import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export async function POST(req) {
  const { fullName, email, mobileNumber, password, confirmPassword } = await req.json();
  await connectDB();

  if (password !== confirmPassword) 
    return Response.json({ error: "Passwords do not match" }, { status: 400 });

  if (await User.findOne({ email }) || await User.findOne({ mobileNumber }))
    return Response.json({ error: "Email or Mobile Number already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const hrId = nanoid(10); // Generate a unique HR ID

  const user = await User.create({ fullName, email, mobileNumber, password: hashedPassword, hrId });

  return Response.json({ message: "User created successfully"}, { status: 201 });
}
