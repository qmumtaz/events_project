import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebase'; 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Styling/navbar.css";

const NavbarComponent = ({ user, role }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary mb-3" id="nav">
        <Container fluid>
          <Navbar.Brand href="/home">Eventures</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                
                {user ? (
                  <>
                    {role === 'staff' && (
                      <>
                        <Nav.Link as={Link} to="/manageevents">Manage Events</Nav.Link>
                        <Nav.Link as={Link} to="/publish">Publish Events</Nav.Link>
                      </>
                    )}
                    {(role === 'staff' || role === 'member' || role === 'user') && (
                      <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Button variant="dark" onClick={handleLogout} size="sm">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
