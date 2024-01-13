import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const lesson = searchParams.get('lesson');
  const type = searchParams.get('type');

  const POST_PER_PAGE = 6;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      lesson: {
        contains: lesson,
        mode: 'insensitive', 
      },
      type:{
        contains: type,
        mode: 'insensitive',
      }
    },
  };

  try {
    const [flips, count,lessons,types] = await prisma.$transaction([
      prisma.flips.findMany(query),
      prisma.flips.count({ where: query.where }),
      prisma.flips.findMany({
        where: {},
        distinct: ['lesson'],
        orderBy: [
          {
            lesson: 'asc',
          },
        ],
        
      }),
      prisma.flips.findMany({
        where: {},
        distinct: ['type']
      }),
    ]);

    return new NextResponse(JSON.stringify({ flips, count ,lessons,types}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

