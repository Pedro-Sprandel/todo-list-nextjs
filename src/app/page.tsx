"use client";
import { TodoItem } from "./components";
import { useCallback, useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "./server";

type Todo = {
  id: string;
  title: string;
  finished: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllTodos = useCallback(async () => {
    const todosAux = await getTodos();
    setTodos(todosAux);
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const onAddTodo = useCallback(
    async (data: FormData) => {
      const title = data.get("title")?.valueOf();
      if (typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid title");
      }
      await addTodo(title);
      await getAllTodos();
    },
    [getAllTodos]
  );

  const onToggleTodo = useCallback(
    async (id: string, finished: boolean) => {
      await toggleTodo(id, finished);
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, finished: !todo.finished };
        }

        return todo;
      });
      setTodos(newTodos);
    },
    [todos]
  );

  const onDeleteTodo = useCallback(
    async (id: string) => {
      await deleteTodo(id);
      await getAllTodos();
    },
    [getAllTodos]
  );

  return (
    <>
      <header className="flex items-center justify-center p-32">
        <h1 className="text-6xl">Tasks</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <form action={onAddTodo} className="flex gap-4 max-w-[32vw]">
          <input
            name="title"
            maxLength={32}
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
        <ul className="flex flex-col justify-left mt-8 max-w-[32vw]">
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
