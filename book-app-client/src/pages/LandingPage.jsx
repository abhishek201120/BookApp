import { Link } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
// import heroImage from '../assets/book-hero.jpg'
import './LandingPage.css'

const LandingPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="landing-page">
      <Container>
        <Row className="align-items-center">
          <Col md={12}>
            <h1 className="display-4 fw-bold mb-4">
              Manage Your Book Collection
            </h1>
            <p className="lead mb-4">
              Keep track of all your favorite books in one place. 
              Organize, categorize, and never forget what you've read.
            </p>
            <div className="d-flex gap-3">
              {user ? (
                <Button as={Link} to="/dashboard" variant="primary" size="lg">
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button as={Link} to="/register" variant="primary" size="lg">
                    Get Started
                  </Button>
                  <Button as={Link} to="/login" variant="outline-primary" size="lg">
                    Login
                  </Button>
                </>
              )}
            </div>
          </Col>
          {/* <Col md={6}>
            <img 
              src={heroImage} 
              alt="Book collection" 
              className="img-fluid rounded shadow" 
            />
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
