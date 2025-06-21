import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import * as Actions from "../actions";
import { API_URL } from "@/config";
import {
  method_GET,
  method_POST,
  method_PUT,
  method_DELETE,
} from "@/stores/request-management";
import { IBookCreateResponse, IBookResponse } from "../types/books";

function* fetchAllBooksSaga(
  action: ReturnType<typeof Actions.fetchAllBooks>
): Generator {
  console.log("action payload :", action.payload);
  console.log("API_URL :", API_URL);
  try {
    const token = "";
    const { page, rowsPerPage } = action.payload;
    const response: AxiosResponse<IBookResponse> = yield method_GET({
      url: `${API_URL}/api/books`,
      params: {
        page,
        rowsPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response :", response.data);
    yield put(Actions.fetchAllBooksSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(Actions.fetchAllBooksFailure(error.message));
    }
  }
}

function* fetchCreateBookSaga(
  action: ReturnType<typeof Actions.fetchCreateBook>
): Generator {
  console.log("action payload :", action.payload);
  try {
    const token = "";
    const response: AxiosResponse<IBookCreateResponse> = yield method_POST({
      url: `${API_URL}/api/books`,
      data: action.payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(Actions.fetchCreateBookSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(Actions.fetchAllBooksFailure(error.message));
    }
  }
}

function* fetchUpdateBookSaga(
  action: ReturnType<typeof Actions.fetchUpdateBook>
): Generator {
  console.log("action payload :", action.payload);
  try {
    const token = "";
    const response: AxiosResponse<IBookCreateResponse> = yield method_PUT({
      url: `${API_URL}/api/books/${action.payload.id}`,
      data: action.payload.data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(Actions.fetchUpdateBookSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(Actions.fetchAllBooksFailure(error.message));
    }
  }
}
function* fetchDeleteBookSaga(
  action: ReturnType<typeof Actions.fetchDeleteBook>
): Generator {
  console.log("action payload :", action.payload);
  try {
    const token = "";
    const response: AxiosResponse<IBookCreateResponse> = yield method_DELETE({
      url: `${API_URL}/api/books/${action.payload}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(Actions.fetchDeleteBookSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(Actions.fetchAllBooksFailure(error.message));
    }
  }
}

function* fetchGetBookSaga(
  action: ReturnType<typeof Actions.fetchGetBook>
): Generator {
  console.log("action payload :", action.payload);
  try {
    const token = "";
    const response: AxiosResponse<IBookCreateResponse> = yield method_GET({
      url: `${API_URL}/api/books/${action.payload}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(Actions.fetchGetBookSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(Actions.fetchAllBooksFailure(error.message));
    }
  }
}

export function* watchBooks() {
  yield takeLatest(Actions.fetchAllBooks.type, fetchAllBooksSaga);
  yield takeLatest(Actions.fetchCreateBook.type, fetchCreateBookSaga);
  yield takeLatest(Actions.fetchUpdateBook.type, fetchUpdateBookSaga);
  yield takeLatest(Actions.fetchDeleteBook.type, fetchDeleteBookSaga);
  yield takeLatest(Actions.fetchGetBook.type, fetchGetBookSaga);
}
