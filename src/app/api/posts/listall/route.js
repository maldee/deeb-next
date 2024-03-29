import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const count = await prisma.post.count();

    return new NextResponse(JSON.stringify({count}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};