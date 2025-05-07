import { Container } from 'react-bootstrap'
import BookList from '../components/BookList'

const BooksPage = () => {
  return (
    <Container className="mt-4">
      <BookList />
    </Container>
  )
}

export default BooksPage