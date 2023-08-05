import { Trip } from "../models/trip";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);
    if (res.ok) {
        return res
    } else {
        const errorBody = await res.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchTrips(): Promise<Trip[]> {
    const res = await fetchData("/api/trips", {
        method: "GET"
      });
      return await res.json();
}

export interface TripInput {
    title: string,
    body: string,
    author?: string,
} 

export async function createTrip(trip: TripInput): Promise<Trip> {
    const res = await fetchData("/api/trips", { method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify(trip) });
    return res.json();
}

export async function updateTrip(tripId: string, trip: TripInput): Promise<Trip> {
    const updatedTrip = await fetchData("/api/trips/" + tripId, { method: "PATCH", headers: { "Content-Type": "application/json"}, body: JSON.stringify(trip) })
    return updatedTrip.json();
}

export async function deleteTrip(tripId: string) {
    await fetchData("/api/trips/" + tripId, { method: "DELETE"});
}