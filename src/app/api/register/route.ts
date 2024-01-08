import bcrypt from "bcrypt";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existUser) {
    return NextResponse.json({ error: "해당 이메일은 이미 존재합니다." });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    revalidatePath(`/mybook/${user.id}`);

    return NextResponse.json(user);
  }
}
