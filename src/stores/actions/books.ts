import { createAction } from "@reduxjs/toolkit";
import { IBook, IBookCreateResponse, IBookResponse } from "../types/books";
import { BookSchema } from "@/modules/books/view/schema";

//// Fetch All Books Failure
export const fetchAllBooksFailure = createAction<string>(
  "FETCH_ALL_Books_FAILURE"
);

// Fetch All Books
export const fetchAllBooks = createAction<{
  page: number;
  rowsPerPage: number;
}>("FETCH_ALL_BOOKS");

export const fetchAllBooksSuccess = createAction<IBookResponse>(
  "FETCH_ALL_BOOKS_SUCCESS"
);

// Fetch Create Book
export const fetchCreateBook = createAction<BookSchema>("FETCH_CREATE_BOOK");

export const fetchCreateBookSuccess = createAction<IBookCreateResponse>(
  "FETCH_CREATE_BOOK_SUCCESS"
);

export const fetchUpdateBook = createAction<{
  id: string;
  data: BookSchema;
}>("FETCH_UPDATE_BOOK");

export const fetchUpdateBookSuccess = createAction<IBookCreateResponse>(
  "FETCH_UPDATE_BOOK_SUCCESS"
);

export const fetchDeleteBook = createAction<string>("FETCH_DELETE_BOOK");

export const fetchDeleteBookSuccess = createAction<IBookCreateResponse>(
  "FETCH_DELETE_BOOK_SUCCESS"
);

export const fetchGetBook = createAction<string>("FETCH_GET_BOOK");

export const fetchGetBookSuccess = createAction<IBookCreateResponse>(
  "FETCH_GET_BOOK_SUCCESS"
);
