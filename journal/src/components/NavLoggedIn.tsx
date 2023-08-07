import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as TripsApi from "../network/trips_api";

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
      <Navbar.Text className="me-2">Signed in as: {User.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavLoggedIn;
