"use server"
import { prisma } from '@/db';

type Todo = {
  id: string;
  title: string;
  finished: boolean;
}

export async function getTodos(): Promise<Todo[]> {
  const todos = await prisma.todo.findMany();

  return todos;
}
