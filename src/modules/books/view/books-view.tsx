"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { BookTable } from "../book-table";
import { useRouter } from "next/navigation";
import { paths } from "@/routers/paths";
import { useAppDispatch, useAppSelector } from "@/lib/use-redux";
import { fetchAllBooks } from "@/stores/actions/books";
import { useEffect } from "react";

// Mock data - ในอนาคตจะมาจาก API

export function BooksView() {
  const router = useRouter();

  return (
    <div className="p-4 w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <Button
          variant="default"
          className=" cursor-pointer"
          onClick={() => router.push(paths.books.new)}
        >
          <PlusIcon className="w-4 h-4" />
          Add Book
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <BookTable />
      </div>
    </div>
  );
}
