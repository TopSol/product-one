import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import {marqueeReservationTemplete} from "../../../templetes"

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
    console.log("Data :", data);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "muhammadwaqar7782@gmail.com",
        pass: "bvcwkxoktifxoqij",
      },
    });
    console.log("testing1");
    
    const info = await transporter.sendMail({
      from: '"TOPSOL" <muhammadwaqar7782@gmail.com>',
      to: email,
      subject: subject, 
      html: html, 
    });

    console.log(info);
    

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
    console.log(error, "error")
    return NextResponse.json(
      { error: "Failed to send email" },
      {
        status: 500,
      }
    );
  }
}
