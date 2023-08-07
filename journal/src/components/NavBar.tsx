import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { User } from "../models/user";
import { Nav } from "react-bootstrap";
import NavLoggedIn from "./NavLoggedIn";
import NavLoggedOut from "./NavLoggedOut";

interface props {
  loggedInUser: User | null;
  SignupClicked: () => void;
  LoginClicked: () => void;
  LogoutClicked: () => void;
}

const NavBar = ({
  loggedInUser,
  SignupClicked,
  LoginClicked,
  LogoutClicked,
}: props) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>Istanbuly</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavLoggedIn User={loggedInUser} onLogout={LogoutClicked} />
            ) : (
              <NavLoggedOut onLogin={LoginClicked} onSignup={SignupClicked} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
