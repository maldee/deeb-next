import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');

  const POST_PER_PAGE = 6;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      OR: [
        {
          doc: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          }
        },
        {
          link: {
            contains: searchQuery,
            mode: 'insensitive', 
          }
        }
        
      ]
      
    },
  };

try {
  const [cloudy, count] = await prisma.$transaction([
    prisma.cloudy.findMany(query),
    prisma.cloudy.count({ where: query.where }),
  ]);
  return new NextResponse(JSON.stringify({ cloudy, count }, { status: 200 }));
  } catch (err) {

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};



