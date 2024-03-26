import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import {createJWTandCookie} from "@/lib/session";

const comparePasswordHash = async (password: string, userPassword: string) => {
  const isMatch = await bcrypt.compare(password, userPassword as string);
  return isMatch;
};

export async function POST(req: Request) {
  try {
    const {email, password} = await req.json();
    if (!email || !password) {
      return new NextResponse("Invaild input", {status: 400});
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await comparePasswordHash(password, user.password)))
      return new NextResponse("Invaild details", {status: 400});

    createJWTandCookie(user?.id!);
    const currentUser = {
      name: user?.name,
      email: user?.email,
      interestedIn: user?.interestedIn,
      isEmailVerified: user?.isEmailVerified,
    };
    return NextResponse.json(currentUser);
  } catch (err) {
    return new NextResponse("Sign-in Error", {status: 500});
  }
}
