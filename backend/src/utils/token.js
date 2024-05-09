import jwt from "jsonwebtoken";

export default function generateToken(userId) {
  const token = jwt.sign(
    {
      _id: userId,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );

  return "Bearer " + token;
}
