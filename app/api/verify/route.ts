import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json(); // Parse the JSON body of the request
    const user = await db.user.findUnique({
      where: {
        email: email, // Assuming your user table has an 'email' field
      },
    });
    console.log(user);
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      body: "Internal Server Error",
    };
  }
}
