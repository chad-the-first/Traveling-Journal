import React, { useEffect, useState } from "react";
import { Trip as TripModel } from "./models/trip";
import Trips from "./components/Trips";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/TripsPage.module.css";
import * as TripsApi from "./network/trips_api";
import AddTripDialog from "./components/AddTripDialog";

function App() {
  const [trips, setTrips] = useState<TripModel[]>([]);
  const [showAddTripDialog, setShowAddTripDialog] = useState(false);

  useEffect(() => {
    async function loadTrips() {
      try {
        const trips = await TripsApi.fetchTrips();
        setTrips(trips);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadTrips();
  }, []);

  return (
    <>
      <Container>
        <Button onClick={() => setShowAddTripDialog(true)}>
          Add a destination
        </Button>
        <Row xs={1} md={2} lg={4} className="g-4">
          {trips.map((trip) => (
            <Col key={trip._id}>
              <Trips trip={trip} className={styles.trip} />
            </Col>
          ))}
        </Row>
        {showAddTripDialog && (
          <AddTripDialog
            onDismiss={() => setShowAddTripDialog(false)}
            onTripSubmited={(newTrip) => {
              setTrips([...trips, newTrip]);
              setShowAddTripDialog(false);
            }}
          />
        )}
      </Container>
    </>
  );
}

export default App;
