import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);

  const searchQuery = searchParams.get('query');

  console.log("querrr "+searchQuery)
  try {
    const chatbits = await prisma.chatbits.findMany({
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
        ],
      }
    });

    console.log("response "+chatbits);
    return new NextResponse(JSON.stringify(chatbits, { status: 200 }));
  } catch (err) {

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};



