import { useCallback, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "../../hooks/useRedux";
import { addTodo, fetchTodoRequest } from "../../store/todoSlice";
import TodoInput from "../TodoInput";
import "./TodoContainer.css";

export default function TodoContainer() {
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

  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInput onAddTodo={handleAddTodo} />
      <div className="todocontainer__nav">
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to="/"
          state={{ filterType: "all" }}
          replace
        >
          all
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to="/"
          state={{ filterType: "active" }}
          replace
        >
          active
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "todo-container__link--active"} todo-container__link`
          }
          to="/"
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
