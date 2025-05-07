import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookProvider } from './context/BookContext'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import BooksPage from './pages/BooksPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Header />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
          </Route>
        </Routes>
      </BookProvider>
    </AuthProvider>
  )
}

export default App