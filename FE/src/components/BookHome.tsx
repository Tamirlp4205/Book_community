"use client";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore"; 
import { AddBookForm } from "./admin/AddBookForm";
import Image from "next/image";

interface Book {
  id: string;
  name: string;
  author: string;
  summary: string;
  type: string;
  bookImg: string;
  username: string;
  createdAt: Date; 
}

export const BookHome = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, "books");
      const bookSnapshot = await getDocs(booksCollection);
      const bookList = bookSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        author: doc.data().author,
        summary: doc.data().summary,
        type: doc.data().type,
        bookImg: doc.data().bookImg,
        username: doc.data().username,
        createdAt: doc.data().createdAt.toDate(), 
      })) as Book[];
      setBooks(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const groupBooksByType = (books: Book[]) => {
    return books.reduce((acc, book) => {
      (acc[book.type] = acc[book.type] || []).push(book);
      return acc;
    }, {} as Record<string, Book[]>);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const groupedBooks = groupBooksByType(books); 

  return (
    <div className="mt-3 flex flex-col gap-10">
      <AddBookForm  />
      <div className="mt-4">
        {Object.keys(groupedBooks).map((type) => (
          <div key={type} className="mb-6">
            <h2 className="text-xl font-bold">{type}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {groupedBooks[type].map((book) => (
                <div key={book.id} className="border p-4 rounded">
                  <h2>{book.username.toLocaleUpperCase()}</h2>
                  <h3 className="font-semibold">{book.name.toLocaleUpperCase()}</h3>
                  <p className="text-sm text-gray-600">Зохиолч: {book.author}</p>
                  {book.bookImg && <Image src={book.bookImg} alt={book.name} width={600} height={400}  />}
                  <p className="text-xs text-gray-500 mt-2">Үүсгэсэн огноо: {book.createdAt.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
