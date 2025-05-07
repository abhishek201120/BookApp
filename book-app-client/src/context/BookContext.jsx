import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { fetchBooks, createBook, updateBook, deleteBook } from '../services/bookService'

export const BookContext = createContext()

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentBook, setCurrentBook] = useState(null)

  const getBooks = async () => {
    setIsLoading(true)
    try {
      const booksData = await fetchBooks()
      setBooks(booksData)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch books')
    } finally {
      setIsLoading(false)
    }
  }

  const addBook = async (bookData) => {
    try {
      const newBook = await createBook(bookData)
      setBooks([newBook, ...books])
      toast.success('Book added successfully')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add book')
      return false
    }
  }

  const editBook = async (id, bookData) => {
    try {
      const updatedBook = await updateBook(id, bookData)
      setBooks(books.map(book => book._id === id ? updatedBook : book))
      toast.success('Book updated successfully')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update book')
      return false
    }
  }

  const removeBook = async (id) => {
    try {
      await deleteBook(id)
      setBooks(books.filter(book => book._id !== id))
      toast.success('Book deleted successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete book')
    }
  }

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        currentBook,
        setCurrentBook,
        getBooks,
        addBook,
        editBook,
        removeBook
      }}
    >
      {children}
    </BookContext.Provider>
  )
}