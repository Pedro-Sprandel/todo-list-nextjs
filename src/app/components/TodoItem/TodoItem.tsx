"use client";
import { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Todo } from "@/app/types";

interface TodoItemProps extends Todo {
  onToggle: (id: string, finished: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { id, title, finished, onToggle, onDelete, onEdit } = props;

  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const onEditSave = async (data: FormData) => {
    const newTitle = data.get("newTitle")?.valueOf();
    if (typeof newTitle === "string" && newTitle.length > 0) {
      onEdit(id, newTitle);
    }
    setIsEdit(false);
  };

  return isEdit ? (
    <form
      action={onEditSave}
      className="flex justify-between gap-4 mb-4 w-full"
    >
      <input
        name="newTitle"
        maxLength={64}
        defaultValue={title}
        className="py-1 rounded-lg px-2 w-full"
      />
      <button
        type="submit"
        className="text-white border-1 border-black rounded-lg py-2 w-[80px] bg-blue-500"
      >
        Save
      </button>
    </form>
  ) : (
    <li className="flex justify-between items-center mb-4 group">
      <div className="flex gap-6 mr-2 max-w-[75%]">
        <input
          type="checkbox"
          className="w-6 rounded-md cursor-pointer peer"
          defaultChecked={finished}
          onChange={(e) => onToggle(id, e.target.checked)}
        />
        <p className="text-2xl peer-checked:line-through peer-checked:text-zinc-600 whitespace-nowrap text-ellipsis max-w-full overflow-hidden">
          {title}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEdit(true)}
          className="border border-neutral-800 px-2 py-2 rounded-lg bg-neutral-500 text-sm text-black hidden group-hover:block"
        >
          <AiFillEdit />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="border border-neutral-800 px-2 py-2 rounded-lg bg-neutral-500 text-sm text-black hidden group-hover:block"
        >
          <BsFillTrash3Fill />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
