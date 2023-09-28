import Jwt from "jsonwebtoken";

export function getDatafromToken(request) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET_KEY);

    return decodedToken.userId;
  } catch (error) {
    throw new Error(error.message);
  }
}
