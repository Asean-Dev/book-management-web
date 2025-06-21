import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderPageNumbers } from "@/utils/render-page-numbers";
import { BooksRow } from "./books-row";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/use-redux";
import {
  fetchAllBooks,
  fetchDeleteBook,
  fetchDeleteBookSuccess,
} from "@/stores/actions/books";
import { paths } from "@/routers/paths";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { defaultValuesBook } from "@/stores/types/books";
const HEADER_CELLS = [
  {
    label: "Title",
    key: "title",
  },
  {
    label: "Author",
    key: "author",
  },
  {
    label: "Published Year",
    key: "publishedYear",
  },
  {
    label: "",
    key: "options",
  },
];

const ITEMS_PER_PAGE = 5;

export function BookTable() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const deleteBook = useAppSelector((state) => state.books.deleteBook);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = Math.ceil(books.pagination.total / ITEMS_PER_PAGE);

  const pages = renderPageNumbers(totalPages, currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchAllBooks({ page: page, rowsPerPage: 5 }));
  };

  const handleEdit = (id: number) => {
    router.push(paths.books.edit(id.toString()));
  };

  const handleDelete = (id: number) => {
    dispatch(fetchDeleteBook(id.toString()));
  };

  useEffect(() => {
    dispatch(fetchAllBooks({ page: 1, rowsPerPage: 5 }));
  }, [dispatch]);

  useEffect(() => {
    if (deleteBook.success) {
      dispatch(fetchAllBooks({ page: 1, rowsPerPage: 5 }));
      dispatch(fetchDeleteBookSuccess(defaultValuesBook.deleteBook));
      toast.success(deleteBook.message, {
        duration: 3000,
        position: "top-right",
      });
    }
  }, [deleteBook.success, dispatch]);

  return (
    <div className="flex-1 justify-between items-center bg-white rounded-2xl border border-gray-200 overflow-hidden pb-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            {HEADER_CELLS.map((cell) => (
              <TableHead className="font-bold " key={cell.key}>
                {cell.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.data.map((book) => (
            <BooksRow
              key={book.id}
              book={book}
              onEdit={() => handleEdit(book.id)}
              onDelete={() => handleDelete(book.id)}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end items-center mt-4 w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {pages.map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page as number);
                    }}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="text-center text-gray-500 w-full flex justify-center items-center mt-4">
        <h1 className="text-sm text-gray-500">
          {books.pagination.page} /{" "}
          {Math.ceil(books.pagination.total / ITEMS_PER_PAGE)}
        </h1>
      </div>
    </div>
  );
}
