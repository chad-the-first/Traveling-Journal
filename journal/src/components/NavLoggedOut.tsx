import { Button } from "react-bootstrap";

interface props {
  onLogin: () => void;
  onSignup: () => void;
}

const NavLoggedOut = ({ onLogin, onSignup }: props) => {
  return (
    <>
      <Button onClick={onSignup}>Sign up</Button>
      <Button onClick={onLogin}>Login</Button>
    </>
  );
};

export default NavLoggedOut;
