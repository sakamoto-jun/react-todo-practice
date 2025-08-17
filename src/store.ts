import { atom } from "jotai";
import { getTodos } from "./services/todoApi";
import { Todo } from "./types";

// atoms
const idAtom = atom(0);
export const todosAtom = atom<Todo[]>([]);

// actions
export const addTodoAtom = atom(null, (get, set, newTodo: string) => {
  const currentId = get(idAtom);

  if (!newTodo.trim()) return;

  set(todosAtom, (prev) => [
    ...prev,
    {
      id: currentId,
      text: newTodo,
      done: false,
    },
  ]);
  set(idAtom, (prev) => prev + 1);
});

export const toggleTodoAtom = atom(null, (_get, set, id: number) => {
  set(todosAtom, (prev) =>
    prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  );
});

export const fetchTodosAtom = atom(null, async (_get, set) => {
  const todos = await getTodos();

  set(todosAtom, todos);
});
