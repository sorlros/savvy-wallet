import bcrypt from "bcrypt";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method === "POST") {
    const body = await request.json();
    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } else {
    return {
      error: "잘못된 접근 방식입니다.",
    };
  }
}
