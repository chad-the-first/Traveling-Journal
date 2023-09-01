import { Button } from "react-bootstrap";

interface props {
  onLogin: () => void;
  onSignup: () => void;
}

const NavLoggedOut = ({ onLogin, onSignup }: props) => {
  return (
    <>
      <Button variant="light" className="me-2" onClick={onSignup}>
        Sign up
      </Button>
      <Button variant="light" onClick={onLogin}>
        Login
      </Button>
    </>
  );
};

export default NavLoggedOut;
