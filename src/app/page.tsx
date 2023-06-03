import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { TodoItem } from "./components";

async function addTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  await prisma.todo.create({ data: { title, finished: false } });
  redirect("/");
}

async function toggleTodo(id: string, finished: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { finished } });
}

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <>
      <header className="flex items-center justify-center p-32">
        <h1 className="text-6xl">Tasks</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <form action={addTodo} className="flex gap-4">
          <input
            name="title"
            placeholder="New task todo..."
            className="py-2 rounded-lg px-4"
          />
          <button
            type="submit"
            className="border-1 border-black rounded-lg py-2 px-4 bg-green-500"
          >
            Add
          </button>
        </form>
        <ul className="flex flex-col justify-left mt-8">
          {todos.map((todo) => (
            <li key={todo.id} className="flex gap-6 mb-4">
              <TodoItem {...todo} onToggle={toggleTodo} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
