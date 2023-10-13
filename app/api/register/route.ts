import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing parameter/s!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
