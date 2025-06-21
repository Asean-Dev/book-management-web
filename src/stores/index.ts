import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/stores/reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/stores/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type storeType = ReturnType<typeof store.getState>;
