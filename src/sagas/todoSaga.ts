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
