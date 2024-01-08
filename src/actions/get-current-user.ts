import { getServerSession } from "next-auth/next";
import prisma from "@/libs/prismadb";
import auth from "../app/api/auth/[...nextauth]";

// export async function getSession() {
//   return await auth();
// }

// 수정해야할 부분

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
