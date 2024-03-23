import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const category = searchParams.get('category');
  const subject = searchParams.get('subject');

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
        {
          category: {
            equals: category,
            mode: 'insensitive',
          }
        },
        {
          subject: {
            equals: subject,
            mode: 'insensitive',
          }
        }
      ]
    },
  };

  try {
    const [cheats, count, categories,subjects] = await prisma.$transaction([
      prisma.cheats.findMany(query),
      prisma.cheats.count({ where: query.where }),
      prisma.cheats.findMany({
        where: {},
        distinct: ['category']
      }),
      prisma.cheats.findMany({
        where: {},
        distinct: ['subject']
      }),
      
    ]);
    return new NextResponse(JSON.stringify({ cheats, count, categories,subjects}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

