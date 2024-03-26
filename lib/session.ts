import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

export function createJWTandCookie(id: string) {
  const token = jwt.sign({_id: id}, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  cookies().set("token", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE!),
    httpOnly: true,
    maxAge: 10 * 86400000, //10 day in ms
  });
  return token;
}

export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
