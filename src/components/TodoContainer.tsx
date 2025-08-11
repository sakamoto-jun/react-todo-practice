import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "../hooks/useRedux";
import { addTodo, fetchTodoRequest, toggleTodo } from "../store/todoSlice";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoContainer() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, [dispatch]);

  const handleAddTodo = useCallback(
    (text: string) => {
      dispatch(addTodo(text));
    },
    [dispatch]
  );

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    </div>
  );
}
