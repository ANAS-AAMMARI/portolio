import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: "anas.aammari7@gmail.com",
    subject: `New message from ${name}`,
    text: `Email: ${email}\nPhone: ${phone ?? "N/A"}\n\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
