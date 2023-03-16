import { getTodos } from "@/lib/todoStore";
import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]>
) {
  if (req.method !== "GET") {
    res.status(405);
    return;
  }

  const todos: Todo[] = await getTodos();
  res.status(200).json(todos);
}
