import { Todo } from "../types";

export function getTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "똥싸기", done: false },
        { id: 2, text: "밥먹기", done: true },
        { id: 3, text: "세수하기", done: false },
        { id: 4, text: "면도하기", done: false },
      ]);
    }, 2000);
  });
}
