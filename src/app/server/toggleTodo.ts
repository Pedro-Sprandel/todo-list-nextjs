"use server";
import { prisma } from "@/db";

export async function toggleTodo(id: string, finished: boolean) {
  await prisma.todo.update({ where: { id }, data: { finished } });
}