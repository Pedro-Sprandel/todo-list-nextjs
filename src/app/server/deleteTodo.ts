"use server";
import { prisma } from '@/db';

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
}
