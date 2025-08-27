import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getTodos } from "../services/todoApi";
import { Todo } from "../types";
import Checkbox from "./Checkbox";

const TodoListWithQuery = () => {
  const location = useLocation();
  const filterType = location.state?.filterType ?? "all";

  const { isLoading, data: todos = [] } = useQuery({
    queryKey: ["todos", filterType],
    queryFn: async () => {
      const todos = await getTodos();

      return filterTodos(todos, filterType);
    },
  });

  const queryClient = useQueryClient();
  const handleToggleTodo = (id: string) => {
    queryClient.setQueryData<Todo[]>(["todos", filterType], (oldTodos) => {
      return oldTodos?.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
    });
  };

  return isLoading ? (
    <div>Loading...123</div>
  ) : (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Checkbox
            id={todo.id}
            label={todo.text}
            checked={todo.done}
            onChange={() => handleToggleTodo(todo.id)}
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

export default TodoListWithQuery;
