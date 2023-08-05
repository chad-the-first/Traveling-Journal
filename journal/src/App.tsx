import React, { useEffect, useState } from "react";
import { Trip, Trip as TripModel } from "./models/trip";
import Trips from "./components/Trips";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/TripsPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as TripsApi from "./network/trips_api";
import AddEditTripDialog from "./components/AddEditTripDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [trips, setTrips] = useState<TripModel[]>([]);
  const [showAddTripDialog, setShowAddTripDialog] = useState(false);
  const [tripToEdit, setTripToEdit] = useState<TripModel | null>(null);

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

  async function deleteTrip(trip: Trip) {
    try {
      await TripsApi.deleteTrip(trip._id);
      setTrips(trips.filter((existingTrip) => existingTrip._id !== trip._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Container>
        <Button
          className={`mt-4 mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddTripDialog(true)}
        >
          <FaPlus />
          Add a destination
        </Button>
        <Row xs={1} md={2} lg={4} className="g-4">
          {trips.map((trip) => (
            <Col key={trip._id}>
              <Trips
                trip={trip}
                className={styles.trip}
                onDeleteTripClicked={deleteTrip}
                onTripClicked={(trip) => setTripToEdit(trip)}
              />
            </Col>
          ))}
        </Row>
        {showAddTripDialog && (
          <AddEditTripDialog
            onDismiss={() => setShowAddTripDialog(false)}
            onTripSubmited={(newTrip) => {
              setTrips([...trips, newTrip]);
              setShowAddTripDialog(false);
            }}
          />
        )}
        {tripToEdit && (
          <AddEditTripDialog
            onDismiss={() => setTripToEdit(null)}
            tripToEdit={tripToEdit}
            onTripSubmited={(updatedTrip) => {
              setTrips(
                trips.map((existingTrip) =>
                  existingTrip._id === updatedTrip._id
                    ? updatedTrip
                    : existingTrip
                )
              );
              setTripToEdit(null);
            }}
          />
        )}
      </Container>
    </>
  );
}

export default App;
