import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const LazyTodoContainer = lazy(
  () => import("./components/TodoContainer/TodoContainer")
);
const LazyTodoList = lazy(() => import("./components/TodoList"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <LazyTodoContainer />
          </Suspense>
        ),
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
    ],
  },
]);

export default router;
