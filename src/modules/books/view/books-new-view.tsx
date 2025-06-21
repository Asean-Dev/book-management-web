"use client";

import { RHFInput } from "@/components/core/rhf-input";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { BookSchema, bookSchema } from "./schema";

import { YearPicker } from "@/components/core/year-picker";
import { useAppDispatch, useAppSelector } from "@/lib/use-redux";
import { paths } from "@/routers/paths";
import {
  fetchCreateBook,
  fetchCreateBookSuccess,
  fetchGetBook,
  fetchUpdateBook,
  fetchUpdateBookSuccess,
} from "@/stores/actions/books";
import { defaultValuesBook } from "@/stores/types/books";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function BooksNewView({ id }: { id?: string }) {
  const createBook = useAppSelector((state) => state.books.createBook);
  const updateBook = useAppSelector((state) => state.books.updateBook);
  const getBook = useAppSelector((state) => state.books.getBook);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<BookSchema>({
    defaultValues: {
      title: getBook.data.title || "",
      author: getBook.data.author || "",
      publishedYear: getBook.data.publishedYear || 0,
      genre: getBook.data.genre || "",
    },
    resolver: yupResolver(bookSchema),
  });

  useEffect(() => {
    if (createBook.success) {
      router.push(paths.books.root);
      dispatch(fetchCreateBookSuccess(defaultValuesBook.createBook));
      toast(createBook.message, {
        action: {
          label: "OK",
          onClick: () => router.push(paths.books.root),
        },
        duration: 3000,
        position: "top-center",
      });
    }
  }, [createBook.success, router, dispatch, updateBook.success]);

  useEffect(() => {
    if (id) {
      dispatch(fetchGetBook(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (getBook.success) {
      form.reset({
        title: getBook.data.title,
        author: getBook.data.author,
        publishedYear: getBook.data.publishedYear,
        genre: getBook.data.genre,
      });
    }
  }, [getBook.success, form]);

  useEffect(() => {
    if (updateBook.success) {
      router.push(paths.books.root);
      dispatch(fetchUpdateBookSuccess(defaultValuesBook.updateBook));
      toast.success(updateBook.message, {
        duration: 3000,
        position: "top-center",
      });
    }
  }, [updateBook.success, router, dispatch]);

  const handleSubmit = form.handleSubmit((data) => {
    if (id) {
      dispatch(fetchUpdateBook({ id, data }));
    } else {
      dispatch(fetchCreateBook(data));
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="p-4 w-full h-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">New Book</h1>
          </div>
          <div className="flex-1 justify-between items-center bg-white rounded-2xl border border-gray-200 overflow-hidden  p-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <RHFInput label="Title" name="title" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <RHFInput label="Author" name="author" type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <YearPicker label="Year" name="publishedYear" />
                </div>
                <div className="flex flex-col gap-2">
                  <RHFInput label="Genre" name="genre" type="text" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="default"
                  className="cursor-pointer"
                  type="submit"
                >
                  {id ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
