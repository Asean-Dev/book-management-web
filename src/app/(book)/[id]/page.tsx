import { BooksNewView } from "@/modules/books/view/books-new-view";

export default function BookPageUpdate({ params }: { params: { id: string } }) {
  console.log("params :", params);
  return <BooksNewView id={params.id} />;
}
