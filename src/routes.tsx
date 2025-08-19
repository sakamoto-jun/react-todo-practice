import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import TodoList from "./components/TodoList";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TodoContainer />,
        children: [
          {
            index: true,
            element: <TodoList />,
          },
          {
            path: "/active",
            element: <TodoList filter="active" />,
          },
          {
            path: "/completed",
            element: <TodoList filter="completed" />,
          },
        ],
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
    ],
  },
]);

export default router;
