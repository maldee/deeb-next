import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const category = searchParams.get('category');
  const abbreviation = searchParams.get('abbreviation');
  const note = searchParams.get('note');

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
          category: {
            contains: category,
            mode: 'insensitive',
          }
        },
        {
          abbreviation: {
            contains: abbreviation,
            mode: 'insensitive',
          }
        },
        {
          note: {
            not: note
          }
        }
      ]

    },
  };

  try {
    const [phrases, count, categories,abbreviations] = await prisma.$transaction([
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
        distinct: ['abbreviation']
      }),
    ]);
    return new NextResponse(JSON.stringify({ phrases, count, categories,abbreviations }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

