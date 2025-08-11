import {
  TypedUseSelectorHook,
  useDispatch as useOriginalDispatch,
  useSelector as useOriginalSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useSelector: TypedUseSelectorHook<RootState> = useOriginalSelector;
export const useDispatch: () => AppDispatch = useOriginalDispatch;
