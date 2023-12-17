import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const searchQuery = searchParams.get('query');
  const page = searchParams.get("page");

  const POST_PER_PAGE = 5;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      question: {
        contains: searchQuery,
        mode: 'insensitive', 
      }
    },
  };

  try {
    const [questions, count] = await prisma.$transaction([
      prisma.qlake.findMany(query),
      prisma.qlake.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ questions, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};