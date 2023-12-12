import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const flips = await prisma.flips.findMany();

    return new NextResponse(JSON.stringify(flips, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};