# ✅ Redux 특징 4가지

1. 예측 가능한 상태 관리

   - 단일 스토어, 순수 리듀서 함수로 상태 흐름이 예측 가능.
   - 상태 변경은 항상 액션(action)을 통해서만 일어남.

2. 명확한 구조

   - 액션, 리듀서, 미들웨어 구조가 분리되어 있어 대규모 프로젝트에 적합.
   - Duck 패턴으로 모듈 단위 관리도 가능.
     > 💡 Duck 패턴: 액션 타입, 액션 생성자, 리듀서가 하나의 파일에 정의된 구조.

3. 풍부한 미들웨어 생태계
   - `redux-saga`, `redux-thunk`, `redux-observable` 등 다양한 미들웨어로 확장 가능.
4. 강력한 개발자 도구
   - Redux DevTools를 통한 액션 추적, 상태 스냅샷, 타임 트래블 디버깅 지원.

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

# ✅ Redux-Saga 특징 4가지

1. 비동기 제어 최적화
   - 제너레이터(`function*`) 기반으로 복잡한 비동기 로직을 순차적으로 표현 가능.
2. 이펙트 함수 제공
   - `take`, `put`, `call`, `fork`, `all` 등 다양한 효과 함수를 통해 사이드 이펙트 제어.
3. 액션 중심 워크플로우
   - 특정 액션 감지(`takeEvery`, `takeLeading`) 후 비동기 처리 → 액션으로 결과 디스패치.
4. 테스트 용이성
   - 제너레이터 함수라서 단계별 실행 흐름을 단위 테스트하기 용이.

## 📦 코드 예시 (Redux-Saga)

### 스토어 & 미들웨어 연결

```ts
// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { todoSaga } from "../sagas/todoSaga";
import todoReducer from "./todoSlice";

function* rootSaga() {
  yield all([todoSaga()]);
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 사가 정의

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
  yield takeLeading(fetchTodoRequest.type, fetchTodoSaga);
}
```

## 📖 설명

- Duck 패턴: 액션 + 리듀서 + 상태를 하나의 slice 파일로 묶어서 모듈화.
- Redux-Saga: 액션 흐름을 제너레이터 함수로 제어, 비동기 로직을 깔끔하게 처리.
- Redux와 Saga 조합은 대규모 앱에서 **예측 가능한 상태 관리** + **복잡한 비동기 처리**를 동시에 잡는 데 최적.
