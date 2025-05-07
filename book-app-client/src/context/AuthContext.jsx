import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loginUser, registerUser, getMe } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Memoized auth check to prevent unnecessary recreations
  const checkAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      const userData = await getMe()
      setUser(userData)
    } catch (error) {
      setUser(null)
      console.error('Authentication check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (credentials) => {
    setIsLoading(true)
    try {
      const userData = await loginUser(credentials)
      setUser(userData)
      toast.success('Login successful')
      navigate('/dashboard')
      return userData
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed'
      toast.error(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    try {
      const registeredUser = await registerUser(userData)
      setUser(registeredUser)
      toast.success('Registration successful')
      navigate('/dashboard')
      return registeredUser
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed'
      toast.error(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}