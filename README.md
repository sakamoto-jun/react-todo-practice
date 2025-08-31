# Redux

## ✅ 특징

1. 예측 가능한 상태 관리

   - 단일 스토어, 순수 리듀서 함수로 상태 흐름이 예측 가능.
   - 상태 변경은 항상 **액션(action)** 을 통해서만 일어남.

2. 명확한 구조

   - 액션, 리듀서, 미들웨어 구조가 분리되어 있어 대규모 프로젝트에 적합.
   - Duck 패턴으로 모듈 단위 관리도 가능.
     > 💡 Duck 패턴: 액션 타입, 액션 생성자, 리듀서가 하나의 파일에 정의된 구조.

3. 풍부한 미들웨어 생태계
   - `redux-saga`, `redux-thunk`, `redux-observable` 등 다양한 미들웨어로 확장 가능.
4. 강력한 개발자 도구
   - **Redux DevTools** 을 통한 액션 추적, 상태 스냅샷, 타임 트래블 디버깅 지원.

## 📦 코드 예시 (Duck 패턴)

```ts
// src/store/todoSlice.ts
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
```

# Redux-Saga

## ✅ 특징

1. 비동기 제어 최적화
   - 제너레이터(`function*`) 기반으로 복잡한 비동기 로직을 순차적으로 표현 가능.
2. 이펙트 함수 제공
   - `take`, `put`, `call`, `fork`, `all` 등 다양한 효과 함수를 통해 사이드 이펙트 제어.
3. 액션 중심 워크플로우
   - 특정 액션 감지(`takeEvery`, `takeLeading`) 후 비동기 처리 → 액션으로 결과 디스패치.
4. 테스트 용이성
   - 제너레이터 함수라서 단계별 실행 흐름을 단위 테스트하기 용이.

## 📦 코드 예시

### 스토어 & 미들웨어 연결

```ts
// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { todoSaga } from "../sagas/todoSaga";
import todoReducer from "./todoSlice";

function* rootSaga() {
  yield all([todoSaga()]); // Saga 나열
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>; // 반환 값 타입들 정의
export type AppDispatch = typeof store.dispatch;
```

### Saga 정의

```ts
// src/sagas/todoSaga.ts
import { call, put, takeLeading } from "redux-saga/effects";
import { getTodos } from "../services/todoApi";
import {
  fetchTodoFailure,
  fetchTodoRequest,
  fetchTodoSuccess,
} from "../store/todoSlice";
import { Todo } from "../types";

function* fetchTodoSaga() {
  try {
    const todos: Todo[] = yield call(getTodos);
    yield put(fetchTodoSuccess({ todos }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchTodoFailure({ error: error.message }));
    } else {
      yield put(fetchTodoFailure({ error: "알 수 없는 에러." }));
    }
  }
}

export function* todoSaga() {
  yield takeLeading(fetchTodoRequest.type, fetchTodoSaga); // fetchTodoRequest 액션 호출 시, fetchTodoSaga 실행
}
```

## 📖 설명

- Duck 패턴: 액션 + 리듀서 + 상태를 하나의 slice 파일로 묶어서 모듈화.
- Redux-Saga: 액션 흐름을 제너레이터 함수로 제어, 비동기 로직을 깔끔하게 처리.
- Redux와 Saga 조합은 대규모 앱에서 **예측 가능한 상태 관리** + **복잡한 비동기 처리**를 동시에 잡는 데 최적.

# TanStack Query(React Query)

## ✅ 특징

1. 서버 상태 전용

   - 캐시, 동기화, 리트라이, 백그라운드 갱신 등 **서버 데이터 라이프사이클**을 자동 관리.

2. 선언형 데이터 패칭

   - `useQuery`, `useMutation`으로 **데이터 흐름을 훅 단위**로 명확히 표현.

3. 캐싱 & 무효화

   - `queryKey`로 캐시 분리, `invalidateQueries`로 필요한 범위만 갱신.

4. 신선도 제어

   - `staleTime`(신선/오래됨) & `gcTime`(캐시 수거)로 **리패치 빈도/메모리 튜닝**.

5. DX 우수
   - 로딩/에러/성공 상태 분리, Devtools 지원, 타입 친화적.

## 📦 코드 예시

### 1) 클라이언트 & 프로바이더

```tsx
// src/main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1분간 '신선' → 재진입 시 재요청 X
      gcTime: 5 * 60_000, // 5분 후 사용 안 되는 캐시 수거
      retry: 1, // 실패 시 1회 재시도
      refetchOnWindowFocus: false,
    },
  },
});

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
```

### 2) 조회: useQuery

```ts
// src/features/todo/useTodos.ts
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../services/todoApi";
import type { Todo } from "../../types";

export function useTodos(filter?: "all" | "active" | "completed") {
  return useQuery({
    queryKey: ["todos", { filter }],
    queryFn: async () => {
      const todos = await getTodos();
      if (filter === "active") return todos.filter((t) => !t.done);
      if (filter === "completed") return todos.filter((t) => t.done);
      return todos;
    },
  });
}
```

### 3) 변경: useMutation + 무효화

```ts
// src/features/todo/useAddTodo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../../services/todoApi";

export function useAddTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] }); // 관련 목록만 재요청
    },
  });
}
```

### 4) 컴포넌트 연결

```tsx
// src/features/todo/TodoList.tsx
import { useTodos } from "./useTodos";
import { useAddTodo } from "./useAddTodo";

export default function TodoList() {
  const { data = [], isLoading, error } = useTodos("all");
  const { mutate, isPending } = useAddTodo();

  if (isLoading) return <p>로딩...</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <div>
      <button onClick={() => mutate({ text: "새 할 일" })} disabled={isPending}>
        추가
      </button>
      <ul>
        {data.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔄 데이터 흐름(처리 순서)

1. 컴포넌트 마운트 → `useQuery`가 `queryKey` 기준 캐시 조회
2. 캐시에 신선 데이터 없음 → `queryFn` 호출
3. 응답 성공 → 캐시에 저장, `data` 반영
4. `useMutation` 성공 시 → 관련 `queryKey` **무효화(invalidate)**
5. 무효화된 키는 다음 렌더/포커스/재시도 타이밍에 재패치

## 💡 팁

- 서버 상태는 React Query, **클라이언트 상태(토글, 폼 임시값)** 는 Zustand/Redux 등으로 분리.
- `staleTime`↑ = 네트워크 절약 / 신선도↓, `gcTime`↓ = 메모리 절약 / 재요청↑ → 서비스 성격에 맞춰 조절.

# TanStack Table (React Table)

## ✅ 특징

1. Headless 테이블

   - UI 강제 없음. 정렬/필터/페이지네이션 로직만 제공 → 원하는 UI로 렌더.

2. 성능 & 유연성

   - Row/Column 모델 최적화, 가상 스크롤, 서버 사이드 페이징/소팅도 대응 쉬움.

3. Controlled/Uncontrolled
   - `initialState`(초기값 1회) vs `state`(외부 완전 제어) 구분 명확.

## 📦 코드 예시

### 1) 컬럼 정의

```tsx
// src/features/products/columns.tsx
import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "./types";

const c = createColumnHelper<Product>();

export const columns = [
  c.accessor("title", {
    header: "상품명",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  c.accessor("price", {
    header: "가격",
    cell: (info) => info.getValue().toLocaleString(),
    enableSorting: true,
  }),
  c.accessor("stock", {
    header: "재고",
    enableSorting: true,
  }),
];
```

### 2) 테이블 훅 구성 (클라이언트 소팅/페이징)

```tsx
// src/features/products/ProductTable.tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import type { Product } from "./types";

export default function ProductTable({ data }: { data: Product[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    // 초기값(한 번만 적용)
    initialState: {
      sorting: [{ id: "title", desc: false }],
    },
    // 외부에서 제어(매 렌더마다 적용)
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    enableSortingRemoval: false,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-3">
      <table className="w-full border">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  onClick={h.column.getToggleSortingHandler()}
                  className="p-2 cursor-pointer select-none"
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {{ asc: " ▲", desc: " ▼" }[
                    h.column.getIsSorted() as "asc" | "desc"
                  ] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((r) => (
            <tr key={r.id} className="border-t">
              {r.getVisibleCells().map((c) => (
                <td key={c.id} className="p-2">
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          이전
        </button>

        {table.getPageOptions().map((pi) => {
          const isActive = pi === table.getState().pagination.pageIndex;
          return (
            <button
              key={pi}
              onClick={() => table.setPageIndex(pi)}
              className={`px-3 py-1 border rounded ${
                isActive ? "bg-black text-white" : ""
              }`}
            >
              {pi + 1}
            </button>
          );
        })}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          다음
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

### 3) 서버 사이드 소팅/페이징(옵션)

- `manualSorting: true`, `manualPagination: true`로 바꾸고 `state`에 `sorting`, `pagination`을 넣은 뒤 변경 핸들러에서 API 재요청하면 됨.

```tsx
const [sorting, setSorting] = useState([]);
const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

const table = useReactTable({
  data,
  columns,
  state: { sorting, pagination },
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
  manualSorting: true,
  manualPagination: true,
  pageCount, // 서버가 내려준 총 페이지 수
  getCoreRowModel: getCoreRowModel(),
});
```

## 🔄 데이터 흐름(처리 순서)

- 언컨트롤드 초기 세팅: `initialState.sorting`이 첫 렌더에만 적용
- 컨트롤드 상태: `state.pagination`은 외부 `useState`의 값이 항상 반영
- 헤더 클릭 → 테이블 내부 정렬 상태 변경(언컨트롤드라면 내부에서 관리)
- 페이지 버튼 클릭 → `setPageIndex` → `onPaginationChange` 호출 → 외부 상태 업데이트 → 렌더

## 💡 팁

- 정렬/필터를 URL 쿼리와 동기화하면 새로고침/공유에 강함(컨트롤드 패턴 추천).
- 리스트가 크면 서버 페이징/소팅으로 전환하고, React Query와 조합하면 깔끔:
  - `queryKey: ["products", { pageIndex, pageSize, sorting }]`
  - 서버 응답에 `totalCount` 받아 `pageCount = Math.ceil(totalCount/pageSize)` 전달.
