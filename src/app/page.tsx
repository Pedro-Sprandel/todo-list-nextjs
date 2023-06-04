"use client";
import { TodoItem } from "./components";
import { useCallback, useEffect, useState } from "react";
import { addTodo, deleteTodo, editTodo, getTodos, toggleTodo } from "./server";

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
      if (typeof title !== "string" || title.length === 0) return;

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

  const onEditTodo = useCallback(
    async (id: string, newTitle: string) => {
      await editTodo(id, newTitle);
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }

        return todo;
      });
      setTodos(newTodos);
    },
    [todos]
  );

  return (
    <>
      <header className="flex items-center justify-center p-32">
        <h1 className="text-6xl">Tasks</h1>
      </header>
      <main className="flex flex-col items-center justify-center px-[5vw] xl:px-[35vw] lg:px-[20vw] md:px-[10vw]">
        <form action={onAddTodo} className="flex gap-4 w-full justify-between">
          <input
            name="title"
            maxLength={64}
            placeholder="New task..."
            className="py-2 rounded-lg px-4 w-full"
          />
          <button
            type="submit"
            className="border-1 border-black rounded-lg py-2 w-[80px] bg-green-500"
          >
            Add
          </button>
        </form>
        <ul className="flex flex-col mt-8 w-full">
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onEdit={onEditTodo}
              onDelete={onDeleteTodo}
              onToggle={onToggleTodo}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
