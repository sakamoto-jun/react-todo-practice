import { useParams } from "react-router-dom";
import { Todo } from "../types";
import useStore from "../useStore";
import Checkbox from "./Checkbox";

const TodoList = () => {
  const { todos, toggleTodo } = useStore();
  const { filterType = "all" } = useParams<{
    filterType?: "all" | "active" | "completed";
  }>();

  const filteredTodos = filterTodos(todos, filterType);

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <Checkbox
            id={`todo-${todo.id}`}
            label={todo.text}
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
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
