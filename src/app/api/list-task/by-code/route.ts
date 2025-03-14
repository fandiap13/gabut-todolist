import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const existingTask = await prisma.task.findMany({
      include: {
        category: true,
        status: true,
        user: true,
      },
    });
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { task_date, title, description, status_id, category_id, user_id } =
      body;

    if (!task_date || !title || !status_id || !category_id || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        task_date: new Date(task_date),
        title,
        description,
        status_id,
        category_id,
        user_id,
      },
    });

    return NextResponse.json(
      {
        message: "Task added",
        data: newTask,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = parseInt(params.taskId);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const body = await req.json();
    const { task_date, title, description, status_id, category_id, user_id } =
      body;

    const updatedTask = await prisma.task.update({
      where: { task_id: taskId },
      data: {
        task_date: task_date ? new Date(task_date) : undefined,
        title,
        description,
        status_id,
        category_id,
        user_id,
      },
    });

    return NextResponse.json(
      {
        message: "Task updated",
        data: updatedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = parseInt(params.taskId);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    await prisma.task.delete({
      where: { task_id: taskId },
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
