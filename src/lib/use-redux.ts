import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../stores/reducers";
import type { store } from "../stores/index";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
