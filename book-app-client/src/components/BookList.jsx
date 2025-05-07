import { useContext, useEffect, useState } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import { BookContext } from '../context/BookContext'
import BookForm from './BookForm'

const BookList = () => {
  const { books, isLoading, getBooks, removeBook, currentBook, setCurrentBook } = useContext(BookContext)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getBooks()
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      removeBook(id)
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setCurrentBook(null)
  }

  if (isLoading) {
    return <div>Loading books...</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Book List</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Book
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentBook(book)
                    setShowModal(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentBook ? 'Edit Book' : 'Add New Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default BookList