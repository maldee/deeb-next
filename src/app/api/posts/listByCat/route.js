import { getAuthSession } from "../../../../utils/auth";
import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const cat = searchParams.get("cat");
 
  const count = await prisma.post.count({
    where: {
      catSlug: {
        equals: cat, // Default mode
      },
    },
  })

  try {
   
    return new NextResponse(JSON.stringify({count}, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};