import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HashRouter, Link } from "react-router-dom";

function HomePage() {
  return (
    <Container>
      <Row>
        <Col>
          Aplikacija za rezervaciju restorana.
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
