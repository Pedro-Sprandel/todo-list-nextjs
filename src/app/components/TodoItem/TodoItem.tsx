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
      <p className="text-2xl peer-checked:line-through peer-checked:text-zinc-600 whitespace-nowrap text-ellipsis max-w-[12rem] overflow-hidden hover:overflow-visible wrap hover:position-absolute hover:whitespace-wrap">
        {title}
      </p>
    </>
  );
};

export default TodoItem;
