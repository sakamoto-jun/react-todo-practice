import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useStore from "../../useStore";
import TodoInput from "../TodoInput";
import "./TodoContainer.css";

export default function TodoContainer() {
  const { addTodo, fetchTodos } = useStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInput onAddTodo={addTodo} />
      <div className="todocontainer__nav">
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to="/"
        >
          all
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to="/active"
        >
          active
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to="/completed"
        >
          completed
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
