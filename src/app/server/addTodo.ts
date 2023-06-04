"use server";
import { prisma } from "@/db";

export async function addTodo(title: string) {
  await prisma.todo.create({
    data: { title, finished: false },
  });
}