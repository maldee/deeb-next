import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const subject = searchParams.get('subject');

  const POST_PER_PAGE = 6;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          }
        },
        {
          subject: {
            contains: subject,
            mode: 'insensitive', 
          }
        }
        
      ]
      
    },
  };

  try {
    const [videos, count,subjects] = await prisma.$transaction([
      prisma.classroom.findMany(query),
      prisma.classroom.count({ where: query.where }),
      prisma.classroom.findMany({
        where: {},
        distinct: ['subject']
      }),
    ]);
    return new NextResponse(JSON.stringify({ videos, count,subjects }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

