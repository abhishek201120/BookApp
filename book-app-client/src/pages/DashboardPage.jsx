import { useContext } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

const DashboardPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      <p>Welcome back, {user?.email}!</p>
      
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Your Books</Card.Title>
              <Card.Text>
                View and manage your book collection
              </Card.Text>
              <Card.Link href="/books">Go to Books</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardPage