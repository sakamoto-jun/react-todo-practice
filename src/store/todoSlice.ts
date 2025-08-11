import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types";

interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.todos.push(action.payload);
      },
      prepare(text: string) {
        const cleanText = text.trim();

        return {
          payload: {
            id: nanoid(),
            text: cleanText,
            done: false,
          } as Todo,
        };
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const matchTodo = state.todos.find((todo) => todo.id === action.payload);

      if (matchTodo) matchTodo.done = !matchTodo.done;
    },
    fetchTodoRequest: (state) => {
      state.status = "loading";
    },
    fetchTodoSuccess: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
      state.status = "succeeded";
    },
    fetchTodoFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  fetchTodoRequest,
  fetchTodoSuccess,
  fetchTodoFailure,
} = todoSlice.actions;
export default todoSlice.reducer;
