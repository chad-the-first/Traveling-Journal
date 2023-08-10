import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import * as TripsApi from "../network/trips_api";
import styles from "../styles/TripsPage.module.css";
import Trips from "../components/Trips";

const AllTripsPage = () => {
  const [trips, setTrips] = useState<TripModel[]>([]);
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

  const tripsGrid = (
    <Row xs={1} md={2} lg={4} className={`g-4 ${styles.tripGrid}`}>
      {trips.map((trip) => (
        <Col key={trip._id}>
          <Trips
            trip={trip}
            className={styles.trip}
            editTripClicked={() => {}}
            loggedIn={null}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className={styles.tripsPage}>
      {tripsLoading && <Spinner animation="border" variant="primary" />}
      {showTripsLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}

      {!tripsLoading && !showTripsLoadingError && (
        <>
          {trips.length > 0 ? tripsGrid : <p>You have no destinations yet.</p>}
        </>
      )}
    </Container>
  );
};

export default AllTripsPage;
