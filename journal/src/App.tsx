import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/TripsPage.module.css";
import NavBar from "./components/NavBar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import { User } from "./models/user";
import * as TripsApi from "./network/trips_api";
import TripsPageLoggedIn from "./components/TripsPageLoggedIn";
import TripsPageLoggedOut from "./components/TripsPageLoggedOut";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginpModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await TripsApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        SignupClicked={() => setShowSignupModal(true)}
        LoginClicked={() => setShowLoginpModal(true)}
        LogoutClicked={() => setLoggedInUser(null)}
      />
      <Container className={styles.tripsPage}>
        <>{loggedInUser ? <TripsPageLoggedIn /> : <TripsPageLoggedOut />}</>
      </Container>
      {showSignupModal && (
        <SignupModal
          onDismiss={() => setShowSignupModal(false)}
          onSignup={(user) => {
            setLoggedInUser(user);
            setShowSignupModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginpModal(false)}
          onLogin={(user) => {
            setLoggedInUser(user);
            setShowLoginpModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
