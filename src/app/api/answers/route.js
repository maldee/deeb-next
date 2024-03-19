import { getAuthSession } from "../../../lib/auth";
import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const qid = parseInt(searchParams.get("qid"));

  try {
    const answers = await prisma.qlakeAnswer.findMany({
      where: {
        questionId: qid
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(answers, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A ANSWER
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const answer = await prisma.qlakeAnswer.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(answer, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
