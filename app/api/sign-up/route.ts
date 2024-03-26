import { createJWTandCookie } from "@/lib/session";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // Change the import statement here

const html = `
  <h1>node mailer</h1>
`;

async function otpier(otp: number, email: string) {
  // Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter:
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "usa44052@gmail.com", // Your email address
      pass: "czza xpxl qrox mjqo", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });

  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: "usa44052@gmail.com",
    to: email,
    subject: "otp for ecommerce app",
    html: `
      <h1> ${otp}</h1>

      `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

const hashPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 12);
  return passwordHash;
};

// export async function GET(res: Response) {
//   res.json({ name: "saransh" });
// }

export async function POST(req: Request, res: Response) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      console.log("error");
      return new NextResponse("Please provide the vaild details", {
        status: 400,
      });
    }
    const passwordHash = await hashPassword(password);
    const otp = Math.floor(Math.random() * 90000000 + 10000000);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        interestedIn: [],
        otp: otp,
      },
    });

    createJWTandCookie(user?.id);
    otpier(otp, email).catch((err) => console.log(err));
    return NextResponse.json(user);
  } catch (err) {
    console.error("Error during signup:", err);
    return new NextResponse(JSON.stringify({ error: "Signup Error" }), {
      status: 500,
    });
  }
}
