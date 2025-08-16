# ✅ Zustand 특징 4가지

1. 보일러플레이트 최소화

   - Redux처럼 액션/리듀서/dispatch 세팅 안 해도 됨.
   - create 안에서 state + action만 정의하면 끝 → 코드 짧고 직관적.

2. React 훅처럼 사용

   - 스토어를 `useStore()` 훅으로 바로 불러와서 사용.
   - 예:

   ```ts
   const { todos, addTodo } = useTodoStore();
   ```

   → 컴포넌트 안에서 바로 state 접근 & 업데이트 가능.

3. 가볍고 유연함

   - 러닝커브 낮음, 파일 하나로도 상태관리 가능.
   - 필요한 만큼만 쓰면 돼서 작은 프로젝트부터 큰 프로젝트까지 확장 쉬움.
   - 미들웨어(`persist`, `devtools`, `immer`) 붙여서 기능 확장도 가능.

4. 얕은 병합(shallow merge) 내장

   > 💡 `set()` 호출 시 Zustand는 내부적으로 shallow merge를 수행합니다.
   > 즉, `set({ done: !state.done })`처럼 필요한 key만 넘겨도 되고,
   > Redux처럼 `...state` 스프레드로 전체 state를 복사할 필요가 없습니다.

   ```ts
   // Redux
   setState((state) => ({ ...state, done: !state.done }));

   // Zustand
   set((state) => ({ done: !state.done }));
   ```

## 코드 예시

```ts
// src/useStore.ts
import { create } from "zustand";
import { getTodos } from "./services/todoApi";
import { Todo } from "./types";

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  fetchTodos: () => Promise<void>;
}

const useStore = create<TodoState>()((set) => ({
  todos: [],
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
```

```ts
// src/components//TodoContainer.tsx
import { useEffect } from "react";
import useStore from "../useStore";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoContainer() {
  const { todos, addTodo, toggleTodo, fetchTodos } = useStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log("TodoContainer 렌더링!");
  return (
    <div>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} />
    </div>
  );
}
```

#
