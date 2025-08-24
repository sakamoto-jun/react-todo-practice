import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../hooks/useRedux";
import { toggleTodo } from "../store/todoSlice";
import { Todo } from "../types";
import Checkbox from "./Checkbox";

const TodoList = () => {
  const location = useLocation();
  const filterType = location.state?.filterType ?? "all";

  const todos = useSelector((state) => state.todo.todos);
  const filteredTodos = useMemo(
    () => filterTodos(todos, filterType),
    [todos, filterType]
  );
  const dispatch = useDispatch();

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <Checkbox
            id={todo.id}
            label={todo.text}
            checked={todo.done}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
        </li>
      ))}
    </ul>
  );
};

function filterTodos(todos: Todo[], filter: "all" | "active" | "completed") {
  if (filter === "active") {
    return todos.filter((todo) => !todo.done);
  } else if (filter === "completed") {
    return todos.filter((todo) => todo.done);
  }
  return todos;
}

export default TodoList;
