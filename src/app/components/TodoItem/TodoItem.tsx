"use client";
import { FaTrash } from "react-icons/fa";

type TodoItemProps = {
  id: string;
  title: string;
  finished: boolean;
  onToggle: (id: string, finished: boolean) => void;
  onDelete: (id: string) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { id, title, finished, onToggle, onDelete } = props;

  return (
    <li className="flex justify-between items-center mb-4 group w-[24vw]">
      <div className="flex gap-6 mr-2">
        <input
          type="checkbox"
          className="w-6 rounded-md cursor-pointer peer"
          defaultChecked={finished}
          onChange={(e) => onToggle(id, e.target.checked)}
        />
        <p className="text-2xl peer-checked:line-through peer-checked:text-zinc-600 whitespace-nowrap text-ellipsis max-w-[12rem] overflow-hidden">
          {title}
        </p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="border border-neutral-800 px-2 py-2 rounded-lg bg-neutral-500 text-sm text-black hidden group-hover:block"
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoItem;
