import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function NavbarComponent() {
  return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Bilety lotnicze
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/allFlights">
                  Baza lotów
                </Nav.Link>
                <Nav.Link as={Link} to="/search">
                  Wyszukaj lot
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Numer rezerwacji"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Znajdź</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
  );
}

export default NavbarComponent;
