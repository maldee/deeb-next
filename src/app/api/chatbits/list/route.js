import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const category = searchParams.get('category');
  const group = searchParams.get('group');

  const POST_PER_PAGE = 10;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      OR: [
        {
          phrase: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          eng_p: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          language: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          example: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          pronounce: {
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
          group: {
            contains: group,
            mode: 'insensitive',
          }
        },
        
      ]

    },
  };

  try {
    const [phrases, count, categories,groups] = await prisma.$transaction([
      prisma.chatbits.findMany(query),
      prisma.chatbits.count({ where: query.where }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['category'],
        orderBy: [
          {
            category: 'asc',
          },
        ],
      }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['group'],
        orderBy: [
          {
            group: 'asc',
          },
        ],
      }),
    ]);
    return new NextResponse(JSON.stringify({ phrases, count, categories,groups }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

