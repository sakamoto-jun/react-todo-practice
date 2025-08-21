import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { login as loginApi } from "../services/userApi";
import { login, setUser } from "../store/commonSlice";
import { User } from "../types";

function* loginSaga(
  action: PayloadAction<{ username: string; password: string }>
) {
  const user: User = yield call(
    loginApi,
    action.payload.username,
    action.payload.password
  );
  yield put(setUser(user));
}

export function* commonSaga() {
  yield takeLatest(login.type, loginSaga);
}
