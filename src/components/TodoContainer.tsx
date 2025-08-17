import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  addTodoAtom,
  fetchTodosAtom,
  todosAtom,
  toggleTodoAtom,
} from "../store";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoContainer() {
  const [todos] = useAtom(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const fetchTodos = useSetAtom(fetchTodosAtom);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} />
    </div>
  );
}
