import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function addTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  await prisma.todo.create({ data: { title, finished: false } });
  redirect("/");
}

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <>
      <header className="flex items-center justify-center p-16 mb-8">
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
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
