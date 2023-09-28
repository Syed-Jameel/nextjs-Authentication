import { NextResponse } from "next/server";
import pool from "../../../../../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(request) {
  try {
    let payload = await request.json();
    const { firstname, lastname, email, password } = payload;

    const plaintextPassword = password;
    const saltRounds = 12; // Number of salt rounds, higher is more secure
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);

    const result = await pool.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2,$3, $4) RETURNING id", [firstname, lastname, email, hashedPassword]);

    const userId = result.rows[0].id;

    // Creating a JWT token and sending it in the response
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Signup Successful! Welcome", success: true }, { status: 201 });

    //storing token in cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("signup error", error);
    return NextResponse.json({ message: "Signup Failed. Please try again", success: false }, { status: 500 });
  }
}
