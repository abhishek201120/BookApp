import axios from 'axios'

const API_URL = 'http://localhost:5000/api/books'

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

// Fetch all books
export const fetchBooks = async () => {
  const response = await axios.get(API_URL, getAuthHeader())
  return response.data.data
}

// Create new book
export const createBook = async (bookData) => {
  const response = await axios.post(API_URL, bookData, getAuthHeader())
  return response.data.data
}

// Update book
export const updateBook = async (id, bookData) => {
  const response = await axios.put(`${API_URL}/${id}`, bookData, getAuthHeader())
  return response.data.data
}

// Delete book
export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeader())
}