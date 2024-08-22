import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
const NavbarComponent = () => {
  return (
    <div>
      <Navbar style={{ background:'#534D64' }} expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className="text-light">
            Project
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className='toggle' />
          <Navbar.Collapse id="navbarScroll" className='mt-1' style={{ background:'#534D64', color: '#fff' }}>
            <Nav
              className="me-auto my-2 my-lg-0"
              navbarScroll
            >
              <Nav.Link as={Link} to="context" className="text-light">Context</Nav.Link>
              <Nav.Link as={Link} to="property" className="text-light">Property</Nav.Link>
              <Nav.Link as={Link} to="events" className="text-light">Events</Nav.Link>
              <Nav.Link as={Link} to="activities" className="text-light">Activities</Nav.Link>
              <Nav.Link as={Link} to="contact-log" className="text-light">Contact-Log</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default NavbarComponent;
