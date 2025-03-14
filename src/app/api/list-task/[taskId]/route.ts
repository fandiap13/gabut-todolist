import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    // console.log({ context });
    const { params } = context;
    const taskId = parseInt(params?.taskId);

    const existingTask = await prisma.task.findFirst({
      where: {
        task_id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        {
          status: 404,
          message: "Task Not Found!",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      status: 200,
      data: existingTask,
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
