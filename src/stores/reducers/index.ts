import { combineReducers } from "@reduxjs/toolkit";

import booksReducer from "@/stores/reducers/books";

export const rootReducer = combineReducers({
  books: booksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
