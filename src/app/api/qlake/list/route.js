import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {

  try {
    const questions = await prisma.qlake.findMany();

    return new NextResponse(JSON.stringify(questions, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};