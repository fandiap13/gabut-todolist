import { prisma } from "@/lib/prisma";
import { formatDate, formatTime } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    let existingTask: any = [];

    // count
    // Get the current date
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Count tasks for today
    const todayCount = await prisma.task.count({
      where: {
        task_date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    // Count tasks scheduled for the future
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    const scheduleCount = await prisma.task.count({
      where: {
        task_date: {
          gt: endOfToday, // Get tasks with task_date greater than the end of today
        },
      },
    });

    // Count all tasks
    const allCount = await prisma.task.count();

    const countData = {
      todayCount,
      scheduleCount,
      allCount,
    };

    // data
    if (status == "today") {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      existingTask = await prisma.task.findMany({
        where: {
          task_date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        include: {
          category: true,
          user: true,
        },
      });
    } else if (status === "schedule") {
      const today = new Date();
      const endOfToday = new Date(today.setHours(23, 59, 59, 999));

      existingTask = await prisma.task.findMany({
        where: {
          task_date: {
            gt: endOfToday, // Get tasks with task_date greater than the end of today
          },
        },
        include: {
          category: true,
          user: true,
        },
      });
    } else {
      existingTask = await prisma.task.findMany({
        include: {
          category: true,
          user: true,
        },
      });
    }

    const formattedTasks = existingTask.map((task: any) => ({
      ...task,
      task_date: formatDate(task.task_date),
      task_time: formatTime(task.task_time),
    }));

    return NextResponse.json({
      status: 200,
      countData,
      data: formattedTasks,
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
    const {
      task_date,
      title,
      description,
      status,
      category_id,
      user_id,
      task_time,
    } = body;

    if (
      !task_date ||
      !title ||
      !status ||
      !category_id ||
      !user_id ||
      !task_time
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // const taskDateTime = new Date(task_date + "T00:00:00Z");
    const taskDateTime = new Date(`${task_date}T${task_time}:00Z`);

    const newTask = await prisma.task.create({
      data: {
        task_date: taskDateTime,
        title,
        description,
        status: parseInt(status),
        category_id: parseInt(category_id),
        user_id: parseInt(user_id),
        // task_time,
        task_time: taskDateTime.toISOString(),
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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      task_date,
      title,
      description,
      status,
      category_id,
      user_id,
      task_time,
      task_id,
    } = body;

    if (
      !task_date ||
      !title ||
      !status ||
      !category_id ||
      !user_id ||
      !task_time ||
      !task_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const taskDateTime = new Date(`${task_date}T${task_time}:00Z`);

    const updatedTask = await prisma.task.update({
      where: { task_id },
      data: {
        task_date: taskDateTime,
        task_time: taskDateTime.toISOString(),
        title,
        description,
        status: parseInt(status),
        category_id: parseInt(category_id),
        user_id: parseInt(user_id),
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { task_id } = body;

    if (!task_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const taskId = parseInt(task_id);
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
