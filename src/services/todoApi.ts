import { Todo } from "../types";

export function getTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "할일 1", done: false },
        { id: 2, text: "할일 2", done: true },
        { id: 3, text: "할일 3", done: false },
        { id: 4, text: "할일 4", done: false },
      ]);
    }, 2000);
  });
}
