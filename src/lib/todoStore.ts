import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/*
export interface Todo {
  id: string;
  title: string;
}


const todos: Todo[] = [];
*/

export async function deleteAll() {
  await prisma.$connect();

  await prisma.todo.deleteMany();
}

export async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos;
}

export async function addTodo(title: string) {
  const newTodo = await prisma.todo.create({
    data: {
      title,
    },
  });
  return newTodo;
}


export async function removeTodoById(id: string) {
  const result = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return !!result;
}