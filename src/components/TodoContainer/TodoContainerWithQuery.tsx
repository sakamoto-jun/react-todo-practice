import { NavLink, Outlet } from "react-router-dom";
import TodoInputWithQuery from "../TodoInputWithQuery";
import "./TodoContainer.css";

export default function TodoContainerWithQuery() {
  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInputWithQuery />
      <div className="todocontainer__nav">
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to=""
          state={{ filterType: "all" }}
          replace
        >
          all
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to=""
          state={{ filterType: "active" }}
          replace
        >
          active
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to=""
          state={{ filterType: "completed" }}
          replace
        >
          completed
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
