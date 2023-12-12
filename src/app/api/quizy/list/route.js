import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const quizes = await prisma.quizy.findMany();

    return new NextResponse(JSON.stringify(quizes, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};