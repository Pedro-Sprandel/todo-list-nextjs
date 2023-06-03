"use client";

type TodoItemProps = {
  id: string;
  title: string;
  finished: boolean;
  onToggle: (id: string, finished: boolean) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { id, title, finished, onToggle } = props;

  return (
    <>
      <input
        type="checkbox"
        className="w-6 rounded-md cursor-pointer peer"
        defaultChecked={finished}
        onChange={(e) => onToggle(id, e.target.checked)}
      />
      <p className="text-2xl peer-checked:line-through peer-checked:text-zinc-600">
        {title}
      </p>
    </>
  );
};

export default TodoItem;
