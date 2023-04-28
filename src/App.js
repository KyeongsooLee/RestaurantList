import './App.css';
import { Col, Container,Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import NotFound from './components/NotFound';
import Restaurants from './components/Restaurants';

function App() {
  return (
  <>
    <Container>
      <Row>
        <Col>
          <Routes>
              <Route path="/" element={<Restaurants />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/Restaurants" element={<Restaurants />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default App;
