import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignupModal from "./components/SignupModal";
import { User } from "./models/user";
import * as TripsApi from "./network/trips_api";
import AllTripsPage from "./pages/AllTripsPage";
import MyTripsPage from "./pages/MyTripsPage";
import PageNotFound from "./pages/PageNotFound";
import TripPage from "./pages/TripPage";
import Styles from "./styles/App.module.css";

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
    <BrowserRouter>
      <>
        <NavBar
          loggedInUser={loggedInUser}
          SignupClicked={() => setShowSignupModal(true)}
          LoginClicked={() => setShowLoginpModal(true)}
          LogoutClicked={() => setLoggedInUser(null)}
        />
        <Container className={Styles.pageContainer}>
          <Routes>
            <Route path="/" element={<AllTripsPage />} />
            <Route path="/:id" element={<TripPage />} />
            <Route
              path="/my-trips"
              element={<MyTripsPage loggedInUser={loggedInUser} />}
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
