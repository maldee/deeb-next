import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const category = searchParams.get('category');
  const subject = searchParams.get('language');

  const POST_PER_PAGE = 10;
  
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          desc: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          category: {
            contains: category,
            mode: 'insensitive',
          }
        },
        {
          subject: {
            contains: subject,
            mode: 'insensitive',
          }
        },
      ]
    },
  };

  try {
    const [confuses, count, categories,subjects] = await prisma.$transaction([
      prisma.confusy.findMany(query),
      prisma.confusy.count({ where: query.where }),
      prisma.confusy.findMany({
        where: {},
        distinct: ['category']
      }),
      prisma.confusy.findMany({
        where: {},
        distinct: ['subject']
      }),
      
    ]);
    return new NextResponse(JSON.stringify({ confuses, count, categories,subjects}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

