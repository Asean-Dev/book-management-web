export interface IBookState {
  books: IBookResponse;
  createBook: IBookCreateResponse;
  updateBook: IBookCreateResponse;
  deleteBook: IBookCreateResponse;
  getBook: IBookCreateResponse;
  booksError: string;
}

export const defaultValuesBook: IBookState = {
  books: {
    code: "",
    success: false,
    message: "",
    data: [],
    pagination: {
      total: 0,
      page: 0,
      rowsPerPage: 0,
    },
  },
  createBook: {
    code: "",
    success: false,
    message: "",
    data: {
      id: 0,
      title: "",
      author: "",
      publishedYear: 0,
      genre: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  updateBook: {
    code: "",
    success: false,
    message: "",
    data: {
      id: 0,
      title: "",
      author: "",
      publishedYear: 0,
      genre: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  deleteBook: {
    code: "",
    success: false,
    message: "",
    data: {
      id: 0,
      title: "",
      author: "",
      publishedYear: 0,
      genre: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  getBook: {
    code: "",
    success: false,
    message: "",
    data: {
      id: 0,
      title: "",
      author: "",
      publishedYear: 0,
      genre: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  booksError: "",
};

export interface IBook {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponse<T> {
  code: string;
  success: boolean;
  message: string;
  data: T;
}

export interface IPagination {
  total: number;
  page: number;
  rowsPerPage: number;
}

export interface IBookResponse extends IResponse<IBook[]> {
  pagination: IPagination;
}

export interface IBookCreateResponse extends IResponse<IBook> {}
