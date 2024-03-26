import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    cookies().delete("token");
    return NextResponse.json({status: "Successfully logged out"});
  } catch (error) {
    return new NextResponse("Logout Error", {status: 500});
  }
}
