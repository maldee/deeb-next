import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const usage = searchParams.get('usage');
  

  const formality = searchParams.get('formality');
  const type = searchParams.get('type');
  const tense = searchParams.get('tense');
  const placement = searchParams.get('placement');

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
          usage: {
            contains: usage,
            mode: 'insensitive',
          }
        },
        {
          formality: {
            contains: formality,
            mode: 'insensitive',
          }
        },
        {
          type: {
            contains: type,
            mode: 'insensitive',
          }
        },
        {
          tense: {
            contains: tense,
            mode: 'insensitive',
          }
        },
        {
          placement: {
            contains: placement,
            mode: 'insensitive',
          }
        },
      ]

    },
  };

  try {
    const [phrases, count, usages,formalities,types,tenses,placements] = await prisma.$transaction([
      prisma.chatbits.findMany(query),
      prisma.chatbits.count({ where: query.where }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['usage'],
        orderBy: [
          {
            usage: 'asc',
          },
        ],
      }),
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
        distinct: ['type'],
        orderBy: [
          {
            type: 'asc',
          },
        ],
      }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['tense'],
        orderBy: [
          {
            tense: 'asc',
          },
        ],
      }),
      prisma.chatbits.findMany({
        where: {},
        distinct: ['placement'],
        orderBy: [
          {
            placement: 'asc',
          },
        ],
      }),
    ]);
    return new NextResponse(JSON.stringify({ phrases, count, usages,formalities,types,tenses,placements }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

