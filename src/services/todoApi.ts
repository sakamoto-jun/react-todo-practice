import { Todo } from "../types";

export const getTodos = () => {
  return new Promise<Todo[]>((resolve) => {
    setTimeout(() => {
      return resolve([
        {
          id: "1",
          text: "리액트 배우기",
          done: true,
        },
        {
          id: "2",
          text: "리덕스 배우기",
          done: false,
        },
      ]);
    }, 1000);
  });
};
