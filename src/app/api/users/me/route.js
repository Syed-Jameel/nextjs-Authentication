import { NextResponse } from "next/server";
import pool from "../../../../../db";
const { getDatafromToken } = require("@/helpers/getDatafromToken");

export async function GET(request) {
  try {
    const userId = await getDatafromToken(request);
    const result = await pool.query("SELECT id, firstname, lastname, email FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    } else {
      const user = result.rows[0];
      return NextResponse.json({ result: user, success: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
  }
}
