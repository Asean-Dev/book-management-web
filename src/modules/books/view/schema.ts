import * as yup from "yup";

export const bookSchema = yup.object({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  publishedYear: yup.number().required("Year is required"),
  genre: yup.string().required("Genre is required"),
});

export type BookSchema = yup.InferType<typeof bookSchema>;
