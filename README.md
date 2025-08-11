# Duck 패턴

- Duck 패턴은 리덕스에서 액션과 리듀서를 함께 묶어 관리하는 방법입니다.
- 액션 타입, 액션 생성자, 리듀서를 하나의 파일에 정의하여 모듈화합니다.
- 이 패턴은 코드의 가독성을 높이고, 유지보수를 용이하게 합니다.

## 코드 예시

```ts
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
```

# Redux-Saga

- [redux-saga](https://redux-saga.js.org/)는 리덕스의 사이드 이펙트를 관리하기 위한 라이브러리입니다.
- 제너레이터 함수를 사용하여 비동기 작업을 처리합니다.
- `take`, `put`, `call`, `fork` 등의 이펙트 함수를 사용하여 액션을 감지하고, API 호출 등을 수행합니다.

## 코드 예시

### 미들웨어 연결

```ts
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
```

### 사가 예시

```ts
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
