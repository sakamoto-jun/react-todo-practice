# ✅ Jotai 특징 4가지

1. 심플한 API

   - `atom`으로 상태 선언, `useAtom`으로 읽기 & 쓰기 한 번에 처리.
   - 불필요한 보일러플레이트 최소화 → 코드 직관적.

2. 필요한 곳만 렌더링

   - atom 단위로 구독 → 해당 atom을 쓰는 컴포넌트만 리렌더.
   - 전역 상태관리에도 성능 부담 ↓

3. 유연한 상태 구성

   - 파생 상태(derived atom), 비동기 상태(async atom) 쉽게 정의 가능.
   - 작은 단위 로컬 상태부터 전역 상태까지 확장 자유로움.

4. React Hook 친화적
   - `useAtom`, `useAtomValue`, `useSetAtom` 등 React 훅 스타일 API.
   - 기존 React 코드와 자연스럽게 섞어 쓰기 가능.

## 📦 코드 예시

```typescript
// src/store.ts
import { atom } from "jotai";
import { getTodos } from "../services/todoApi";
import { Todo } from "../types";

const idAtom = atom(0);
export const todosAtom = atom<Todo[]>([]);

export const addTodoAtom = atom(null, (get, set, newTodo: string) => {
  const currentId = get(idAtom);

  if (!newTodo.trim()) return;

  set(todosAtom, (prev) => [
    ...prev,
    { id: currentId, text: newTodo, done: false },
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
```

```typescript
// src/components/TodoContainer.tsx
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  todosAtom,
  addTodoAtom,
  toggleTodoAtom,
  fetchTodosAtom,
} from "../atoms/todoAtoms";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoContainer() {
  const [todos] = useAtom(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const fetchTodos = useSetAtom(fetchTodosAtom);

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
