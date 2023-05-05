import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import React, { useState } from "react";

function NavbarComponent() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const goToReservation = () => {
    if (search.match(/^-?\d+$/)) {
      navigate({
        pathname: "/reservation",
        search: createSearchParams({
          id: search,
        }).toString(),
      });
    } else {
      alert("Niepoprawny numer rezerwacji");
    }
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Bilety lotnicze
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/searchResults?dep=&arr=&date=">
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
                onChange={(event) => setSearch(event.target.value)}
              />
              <Button
                onClick={() => goToReservation()}
                variant="outline-success"
              >
                Znajdź
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
