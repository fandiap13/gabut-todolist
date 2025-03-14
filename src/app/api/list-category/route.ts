import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    const existingData = await prisma.category.findMany();
    return NextResponse.json({
      status: 200,
      data: existingData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Interval server error",
        error: error ? error.toString() : "Interval server error",
      },
      { status: 500 }
    );
  }
}
