import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import { getUser } from "./services/userApi";

const LazyTodoList = lazy(() => import("./components/TodoList"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { default: TodoContainer } = await import(
            "./components/TodoContainer/TodoContainer"
          );
          return { Component: TodoContainer };
        },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LazyTodoList />
              </Suspense>
            ),
          },
          {
            path: "/:filterType",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LazyTodoList />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/protected",
        loader: async () => {
          try {
            const user = await getUser();
            return { user };
          } catch {
            return redirect("/login");
          }
        },
        element: <div>Protected</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
