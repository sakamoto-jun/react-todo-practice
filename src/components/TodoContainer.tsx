import { useCallback, useState } from "react";
import { Todo } from "../types";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = useCallback((text: string) => {
    setTodos((prev) =>
      prev.concat({
        id: prev.length + 1,
        text,
        done: false,
      })
    );
  }, []);
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      })
    );
  };

  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    </div>
  );
}
