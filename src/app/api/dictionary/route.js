import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const searchQuery = searchParams.get('query');
  const category = searchParams.get('category');
  const language = searchParams.get('language');

  const POST_PER_PAGE = 10;
  
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      OR: [
        {
          word: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          sin_w: {
            contains: searchQuery,
            mode: 'insensitive', // Default value: default
          },
        },
        {
          eng_w: {
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
          language: {
            contains: language,
            mode: 'insensitive',
          }
        }
      ]
    },
  };

  try {
    const [words, count, categories,languages] = await prisma.$transaction([
      prisma.dictionary.findMany(query),
      prisma.dictionary.count({ where: query.where }),
      prisma.dictionary.findMany({
        where: {},
        distinct: ['category']
      }),
      prisma.dictionary.findMany({
        where: {},
        distinct: ['language']
      }),
    ]);
    return new NextResponse(JSON.stringify({ words, count, categories,languages }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

