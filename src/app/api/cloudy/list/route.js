import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const cloudy = await prisma.cloudy.findMany();

    return new NextResponse(JSON.stringify(cloudy, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};