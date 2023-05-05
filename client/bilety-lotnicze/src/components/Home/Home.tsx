import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/home.css";

export const Home = () => {
  return (
    <div className="background-image">
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col md={6} className="landing-page">
            <h1>Witaj w systemie rezerwacji biletów lotniczych</h1>
            <p>Tutaj znajdziesz najlepsze oferty na bilety lotnicze do różnych miejsc na świecie.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
