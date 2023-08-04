import React, { useEffect, useState } from "react";
import { Trip as TripModel } from "./models/trip";
import Trips from "./components/Trips";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/TripsPage.module.css";

function App() {
  const [trips, setTrips] = useState<TripModel[]>([]);

  useEffect(() => {
    async function loadTrips() {
      try {
        const res = await fetch("/api/trips", {
          method: "GET",
        });
        const trips = await res.json();
        setTrips(trips);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadTrips();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {trips.map((trip) => (
          <Col key={trip._id}>
            <Trips trip={trip} className={styles.trip} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
