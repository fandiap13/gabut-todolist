import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, name } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: { email: email },
  });

  if (existingUser) {
    return res.status(200).json(existingUser);
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return res.status(201).json(user); // Return 201 Created
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "User  creation failed" });
  }
}
