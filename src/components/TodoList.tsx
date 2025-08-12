import { observer } from "mobx-react-lite";
import { Todo } from "../types";
import Checkbox from "./Checkbox";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
}

const TodoListBase = ({ todos, onToggleTodo }: TodoListProps) => {
  console.log("TodoList 렌더링!");

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Checkbox
            id={`todo-${todo.id}`}
            label={todo.text}
            checked={todo.done}
            onChange={() => onToggleTodo(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
};

const TodoList = observer(TodoListBase);

export default TodoList;
