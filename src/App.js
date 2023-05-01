import './App.css';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import About from './components/About';
import Restaurant from './components/Restaurant';
import Restaurants from './components/Restaurants';
import NotFound from './components/NotFound';

function App() {
  let [searchString, setSearchString] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/restaurants?borough=${searchString}`);
    setSearchString("");
  };

  return (
  <>
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>New York Restaurants</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/restaurants">
            <Nav.Link>Full List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form onSubmit={handleSubmit} inline>
          <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <br />
    <Container>
      <Row>
        <Col>
          <Routes>
              <Route path="/" element={<Restaurants />} />
              <Route path="/about" element={<About />} />
              <Route path="/Restaurants" element={<Restaurants />} />
              <Route path="/Restaurant/:id" element={<Restaurant />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default App;
