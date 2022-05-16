import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const BottomBar = () => {
  return (
    <div>
      <Navbar expand={"lg"} variant={"light"} bg={"light"} className={""}>
        <Container fluid={"lg"}>
          <Nav className={"m-auto customer-bot-nav "}>
            <Nav.Link href="/home">
              <h4 className={"bot-link"}>Home</h4>
            </Nav.Link>
            <Nav.Link href="/menu">
              <h4 className={"bot-link"}>Menu</h4>
            </Nav.Link>
            <Nav.Link href="/promos">
              <h4 className={"bot-link"}>Promos</h4>
            </Nav.Link>
            <Nav.Link href="/about">
              <h4 className={"bot-link"}>About</h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default BottomBar;
