import { ChangeEvent, useEffect, useState } from "react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    console.log("onAddTodo 변경됨!!");
  }, [onAddTodo]);

  const addTodo = () => {
    if (!newTodo) return;
    onAddTodo(newTodo);
    setNewTodo("");
  };

  console.log("Todo Input 렌더링!");
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
      />
      <button onClick={addTodo}>추가</button>
    </div>
  );
};

export default TodoInput;
