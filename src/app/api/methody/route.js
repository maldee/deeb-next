import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const [methodies] = await prisma.$transaction([
      prisma.methody.findMany(),
   
     ]);

    return new NextResponse(JSON.stringify({methodies}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
