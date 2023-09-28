import { NextResponse } from "next/server";
import pool from "../../../../../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(request) {
  try {
    let payload = await request.json();
    const { email, password } = payload;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Invalid login credentials. Please try again.", success: false }, { status: 401 });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid login credentials.Please try again.", success: false }, { status: 401 });
    }

    // Creating a JWT token and sending it in the response
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Login Successful! Welcome", success: true }, { status: 200 });

    //storing token in cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("login error", error);
    return NextResponse.json({ message: "Login Failed. Please try again", success: false }, { status: 500 });
  }
}
