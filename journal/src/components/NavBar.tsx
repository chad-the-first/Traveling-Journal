import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { User } from "../models/user";
import { Nav } from "react-bootstrap";
import NavLoggedIn from "./NavLoggedIn";
import NavLoggedOut from "./NavLoggedOut";
import { Link } from "react-router-dom";
import styles from "../styles/App.module.css";

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
    <Navbar
      className={styles.navBg}
      bg="primary"
      variant="dark"
      expand="sm"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          ~ Istanbuly ~
        </Navbar.Brand>
        <p className="m-auto" style={{ color: "white" }}>
          my personal guide to Istanbul
        </p>
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
