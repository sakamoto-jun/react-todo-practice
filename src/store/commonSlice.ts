import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface CommonState {
  user: User | null;
}

const initialState: CommonState = {
  user: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    login: (
      _state,
      _action: PayloadAction<{ username: string; password: string }>
    ) => {
      // commonSaga에서 미들웨어 처리
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, setUser } = commonSlice.actions;

const commonReducer = commonSlice.reducer;
export default commonReducer;
