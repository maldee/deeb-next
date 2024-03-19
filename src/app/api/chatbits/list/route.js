import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const situation = searchParams.get('situation');
  const language = searchParams.get('language');
  const formality = searchParams.get('formality');
  
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
          sin_p: {
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
          note: {
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
          formality: {
            contains: formality,
            mode: 'insensitive',
          }
        },
        {
          situation: {
            contains: situation,
            mode: 'insensitive',
          }
        },
        {
          language: {
            contains: language,
            mode: 'insensitive',
          }
        },
      ]

    },
  };

  try {
    const [phrases, count, formalities,situations,languages] = await prisma.$transaction([
      prisma.chatbits.findMany(query),
      prisma.chatbits.count({ where: query.where }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['formality'],
        orderBy: [
          {
            formality: 'asc',
          },
        ],
      }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['situation'],
        orderBy: [
          {
            situation: 'asc',
          },
        ],
      }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['language'],
        orderBy: [
          {
            language: 'asc',
          },
        ],
      }),
    ]);
    return new NextResponse(JSON.stringify({ phrases, count,formalities,situations,languages}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

