import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
export async function GET(req) {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405,
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, subject, description, html } = data;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "muhammadwaqar7782@gmail.com",
        pass: "bvcwkxoktifxoqij",
      },
    });

    const info = await transporter.sendMail({
      from: '"TOPSOL" <muhammadwaqar7782@gmail.com>',
      to: email,
      subject: subject,
      html: html,
    });


    if (info.messageId) {
      return NextResponse.json("Mail has been sent", {
        status: 200,
      });
    } else {
      return NextResponse.json("Something went wrong!", {
        status: 500,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      {
        status: 500,
      }
    );
  }
}
