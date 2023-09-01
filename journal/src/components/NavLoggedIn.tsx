import { Button, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as TripsApi from "../network/trips_api";
import { Link } from "react-router-dom";

interface props {
  User: User;
  onLogout: () => void;
}

const NavLoggedIn = ({ User, onLogout }: props) => {
  async function logout() {
    try {
      await TripsApi.logOut();
      onLogout();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2 mt-2">
        Signed in as: {User.username}
      </Navbar.Text>
      <Button variant="light" className="me-2">
        <Nav.Link style={{ color: "black" }} as={Link} to="/my-trips">
          My Trips
        </Nav.Link>
      </Button>
      <Button variant="danger" onClick={logout}>
        Log out
      </Button>
    </>
  );
};

export default NavLoggedIn;
