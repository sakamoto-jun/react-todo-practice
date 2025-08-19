import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../hooks/useRedux";
import { toggleTodo } from "../store/todoSlice";
import { Todo } from "../types";
import Checkbox from "./Checkbox";

const TodoList = () => {
  const { filterType = "all" } = useParams<{
    filterType?: "all" | "active" | "completed";
  }>();
  const filteredTodos = useSelector((state) => {
    const filteredTodos = filterTodos(state.todo.todos, filterType);
    return filteredTodos;
  });
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
