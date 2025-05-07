import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}auth`

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data.user
}

// Login user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data.user
}

// Get current user
export const getMe = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.user
}