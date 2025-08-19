import { useDispatch, useSelector } from "../hooks/useRedux";
import { toggleTodo } from "../store/todoSlice";
import { Todo } from "../types";
import Checkbox from "./Checkbox";

interface TodoListProps {
  filter?: "all" | "active" | "completed";
}

const TodoList = ({ filter }: TodoListProps) => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const filteredTodos = filterTodos(todos, filter);

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

function filterTodos(todos: Todo[], filter: TodoListProps["filter"]) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.done);
  } else if (filter === "completed") {
    return todos.filter((todo) => todo.done);
  }

  return todos;
}

export default TodoList;
