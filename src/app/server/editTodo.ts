"use server"
import { prisma } from '@/db';

export async function editTodo(id: string, newTitle: string) {
  await prisma.todo.update({ where: { id }, data: { title: newTitle }})
}
