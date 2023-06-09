"use server"
import { prisma } from '@/db';
import { Todo } from '../types';

export async function getTodos(): Promise<Todo[]> {
  const todos = await prisma.todo.findMany();

  return todos;
}
