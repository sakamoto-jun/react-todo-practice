/* eslint-disable react-refresh/only-export-components */
import { lazy, PropsWithChildren, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import { useSelector } from "./hooks/useRedux";

const LazyTodoList = lazy(() => import("./components/TodoList"));
const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = useSelector((state) => state.common.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
        element: (
          <ProtectedRoute>
            <div>Protected</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
