import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Trip, Trip as TripModel } from "../models/trip";
import * as TripsApi from "../network/trips_api";
import AddEditTripDialog from "./AddEditTripDialog";
import Trips from "./Trips";
import styles from "../styles/TripsPage.module.css";
import stylesUtils from "../styles/utils.module.css";

const TripsPageLoggedIn = () => {
  const [trips, setTrips] = useState<TripModel[]>([]);
  const [showAddTripDialog, setShowAddTripDialog] = useState(false);
  const [tripToEdit, setTripToEdit] = useState<TripModel | null>(null);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [showTripsLoadingError, setShowTripsLoadingError] = useState(false);

  useEffect(() => {
    async function loadTrips() {
      try {
        setShowTripsLoadingError(false);
        setTripsLoading(true);
        const trips = await TripsApi.fetchTrips();
        setTrips(trips);
      } catch (error) {
        console.error(error);
        setShowTripsLoadingError(true);
      } finally {
        setTripsLoading(false);
      }
    }
    loadTrips();
  }, []);

  async function deleteTrip(trip: Trip) {
    try {
      await TripsApi.deleteTrip(trip._id);
      setTrips(trips.filter((existingTrip) => existingTrip._id !== trip._id));
      setTripToEdit(null);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const tripsGrid = (
    <Row xs={1} md={2} lg={4} className={`g-4 ${styles.tripGrid}`}>
      {trips.map((trip) => (
        <Col key={trip._id}>
          <Trips
            trip={trip}
            className={styles.trip}
            onTripClicked={(trip) => setTripToEdit(trip)}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        className={`mt-4 mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddTripDialog(true)}
      >
        <FaPlus />
        Add a destination
      </Button>

      {tripsLoading && <Spinner animation="border" variant="primary" />}
      {showTripsLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}

      {!tripsLoading && !showTripsLoadingError && (
        <>
          {trips.length > 0 ? tripsGrid : <p>You have no destinations yet.</p>}
        </>
      )}

      {showAddTripDialog && (
        <AddEditTripDialog
          onDismiss={() => setShowAddTripDialog(false)}
          onDeleteTripClicked={deleteTrip}
          onTripSubmited={(newTrip) => {
            setTrips([...trips, newTrip]);
            setShowAddTripDialog(false);
          }}
        />
      )}
      {tripToEdit && (
        <AddEditTripDialog
          onDismiss={() => setTripToEdit(null)}
          onDeleteTripClicked={deleteTrip}
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
    </>
  );
};

export default TripsPageLoggedIn;
