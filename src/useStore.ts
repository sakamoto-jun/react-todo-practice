import { create } from "zustand";
import { getTodos } from "./services/todoApi";
import { Todo, User } from "./types";

type State = {
  user: User | null;
  todos: Todo[];
};

type Action = {
  setUser: (user: User) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  fetchTodos: () => Promise<void>;
};

const useStore = create<State & Action>()((set) => ({
  user: null,
  todos: [],
  setUser: (user) => {
    set({ user });
  },
  addTodo: (text) => {
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false }],
    }));
  },
  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    }));
  },
  fetchTodos: async () => {
    const todos = await getTodos();

    set({ todos });
  },
}));

export default useStore;
