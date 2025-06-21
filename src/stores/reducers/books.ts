import { createReducer } from "@reduxjs/toolkit";
import * as Actions from "../actions/books";
import { IBookState, defaultValuesBook } from "../types/books";

const initialState: IBookState = defaultValuesBook;

const booksReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch All Books Failure
    .addCase(Actions.fetchAllBooksFailure, (state, action) => {
      state.booksError = action.payload;
    })
    // Fetch All Books
    .addCase(Actions.fetchAllBooksSuccess, (state, action) => {
      state.books = action.payload;
    })
    // Fetch Create Book
    .addCase(Actions.fetchCreateBookSuccess, (state, action) => {
      state.createBook = action.payload;
    })
    // Fetch Update Book
    .addCase(Actions.fetchUpdateBookSuccess, (state, action) => {
      state.updateBook = action.payload;
    })
    // Fetch Delete Book
    .addCase(Actions.fetchDeleteBookSuccess, (state, action) => {
      state.deleteBook = action.payload;
    })
    // Fetch Get Book
    .addCase(Actions.fetchGetBookSuccess, (state, action) => {
      state.getBook = action.payload;
    });
});

export default booksReducer;
