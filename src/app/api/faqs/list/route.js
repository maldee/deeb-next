import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');

  const POST_PER_PAGE = 10;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      OR: [
        {
          desc: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
      ]

    },
  };

  try {
    const [faqs,count] = await prisma.$transaction([
      prisma.faq.findMany(query),
      prisma.faq.count({ where: query.where }),
     
    ]);
    return new NextResponse(JSON.stringify({faqs,count}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

