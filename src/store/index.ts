import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { commonSaga } from "../sagas/commonSaga";
import { todoSaga } from "../sagas/todoSaga";
import commonReducer from "./commonSlice";
import todoReducer from "./todoSlice";

function* rootSaga() {
  yield all([commonSaga(), todoSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    common: commonReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
