import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IBook } from "@/stores/types/books";

interface BooksRowProps {
  book: IBook;
  onEdit: () => void;
  onDelete: () => void;
}

export function BooksRow({ book, onEdit, onDelete }: BooksRowProps) {
  return (
    <TableRow>
      <TableCell className="">{book.title}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>{book.publishedYear}</TableCell>
      <TableCell className="flex gap-2 justify-end">
        <Button variant="outline" className="cursor-pointer" onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
