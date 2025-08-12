import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../contexts/StoreContext";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoContainerBase = () => {
  const { todos, addTodo, toggleTodo, fetchTodos } = useStore();

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
};

const TodoContainer = observer(TodoContainerBase);

export default TodoContainer;
