import { useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { BookContext } from '../context/BookContext'

const BookForm = ({ onClose }) => {
  const { currentBook, addBook, editBook } = useContext(BookContext)
  const [formData, setFormData] = useState({
    title: '',
    author: ''
  })

  useEffect(() => {
    if (currentBook) {
      setFormData({
        title: currentBook.title,
        author: currentBook.author
      })
    }
  }, [currentBook])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const success = currentBook 
      ? await editBook(currentBook._id, formData)
      : await addBook(formData)
    
    if (success) {
      onClose()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onClose} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {currentBook ? 'Update' : 'Save'}
        </Button>
      </div>
    </Form>
  )
}

export default BookForm