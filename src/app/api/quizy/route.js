import { getAuthSession } from "../../../utils/auth";
import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);

  const searchQuery = searchParams.get('query');

  try {
   
    const quizes = await prisma.quizy.findMany({
      take: 10,
      where: {
        title: {
          contains: searchQuery,
          mode: 'insensitive', // Default value: default
        },
      },
    });


    return new NextResponse(JSON.stringify(quizes, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

