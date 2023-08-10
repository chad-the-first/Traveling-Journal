import { useState, useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import * as TripsApi from "../network/trips_api";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/TripsPage.module.css";
import TripOnShow from "../components/TripOnShow";

const TripPage = () => {
  const [trip, setTrip] = useState<TripModel>();
  const [tripLoading, setTripLoading] = useState(true);
  const [showTripLoadingError, setShowTripLoadingError] = useState(false);

  const [queryParameters] = useSearchParams();

  useEffect(() => {
    async function loadTrip() {
      try {
        const tripId = window.location.pathname.slice(1);
        console.log(tripId);
        setShowTripLoadingError(false);
        setTripLoading(true);
        const trip = await TripsApi.fetchOneTrip(
          window.location.pathname.slice(1)
        );
        setTrip(trip);
      } catch (error) {
        console.error(error);
        setShowTripLoadingError(true);
      } finally {
        setTripLoading(false);
      }
    }
    loadTrip();
  }, []);

  return (
    <Container className={styles.tripsPage}>
      {tripLoading && <Spinner animation="border" variant="primary" />}
      {showTripLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}

      {!tripLoading && !showTripLoadingError && (
        <>
          {trip ? (
            <TripOnShow tripOnShow={trip} />
          ) : (
            <p>You have no destinations yet.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default TripPage;
