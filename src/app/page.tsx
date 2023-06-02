import { prisma } from "@/db";

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <body>
      <header className="flex items-center justify-center p-16 mb-8">
        <h1 className="text-6xl">Tasks</h1>
      </header>
      <main className="flex items-center justify-center">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </main>
    </body>
  );
}
