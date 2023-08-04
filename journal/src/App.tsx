import React, { useEffect, useState } from "react";
import { Trip as TripModel } from "./models/trip";
import Trips from "./components/Trips";

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
    <div>
      {trips.map((trip) => (
        <Trips trip={trip} key={trip._id} />
      ))}
    </div>
  );
}

export default App;
