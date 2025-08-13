import React from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';

function NavBar() {
  return (
    <Navbar expand="lg" className="main-navbar" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: '30px', marginRight: '10px' }} 
            />
            {/* UPDATED: App name changed to "Movie Recommender" */}
            <span className="navbar-brand-custom">Movie Recommender</span>
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fa-solid fa-home"></i>&nbsp; Home
              </Nav.Link>
            </LinkContainer>

            <Nav.Link href="#genre">Genre</Nav.Link>
            <Nav.Link href="#country">Country</Nav.Link>
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#tvshows">TV Shows</Nav.Link>
            <Nav.Link href="#topimdb">Top IMDB</Nav.Link>
            <Nav.Link href="#androidapp">Android App</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <NavDropdown title="About Project" id="basic-nav-dropdown">
              <LinkContainer to="/overview">
                <NavDropdown.Item>
                  <i className="fa-solid fa-clipboard-question"></i>&nbsp; Project Details
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href="https://github.com/kigehiflorence/movie-reccomder-app-project-nexus" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>&nbsp; Project Code
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/kigehiflorence" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>&nbsp; Github
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.linkedin.com/in/florence-kigehi-3401a1316/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn
              </NavDropdown.Item>
            </NavDropdown>

            <Form className="d-flex align-items-center ms-lg-3">
              <FormControl
                type="search"
                placeholder="Enter keywords..."
                className="me-2 search-input"
                aria-label="Search"
              />
            </Form>
            {/* ADDED: Sign up button */}
            <Button className="btn-signup me-2">Sign Up</Button>
            {/* KEPT: Login button */}
            <Button className="btn-login">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
