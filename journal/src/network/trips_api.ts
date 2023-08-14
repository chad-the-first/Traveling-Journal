import { Trip } from "../models/trip";
import { User } from "../models/user";
import axios from "axios";

axios.defaults.baseURL = 'https://traveling-journal-backend.onrender.com';
axios.defaults.headers.post['Content-Type'] = "application/json";


export async function getLoggedInUser(): Promise<User> {
    const res = await axios({
        url: "/api/users",
        method: "GET" 
    });
    return res.data;
}

export interface SignupCredentials {
    username: string,
    email?: string,
    password: string
}

export async function signUp(credentials: SignupCredentials): Promise<User> {
    const res = await axios({
        url: "/api/users/signup", 
        method: "POST", 
        withCredentials: true,
        data: JSON.stringify(credentials)
    })
    return res.data;
}

export async function logIn(credentials: SignupCredentials): Promise<User> {
    const res = await axios({
        url: "/api/users/login", 
        method: "POST",
        withCredentials: true,
        data: JSON.stringify(credentials)
    });
    return res.data;
}

export async function logOut() {
    await axios({
        url: "/api/users/logout", 
        method: "POST",
    });
}

export async function fetchTrips(): Promise<Trip[]> {
    const res = await axios({
        url: "/api/trips", 
        method: "GET"
      });
      return res.data;
}

export async function fetchOneTrip(tripId: string): Promise<Trip> {
    const res = await axios({
        url: "http://localhost:5000/api/trips/" + tripId, 
        method: "GET"
      });
      return res.data;
}

export async function fetchMyTrips(): Promise<Trip[]> {
    const res = await axios({
        url: "http://localhost:5000/api/trips/my-trips", 
        withCredentials: true,
        method: "GET"
      });
      return res.data;
}

export interface TripInput {
    title: string,
    body: string,
    author?: string,
} 

export async function createTrip(trip: TripInput): Promise<Trip> {
    const res = await axios({
        url: "/api/trips", 
        method: "POST", 
        withCredentials: true,
        data: JSON.stringify(trip) 
    });
    return res.data;
}

export async function updateTrip(tripId: string, trip: TripInput): Promise<Trip> {
    const updatedTrip = await axios({
        url: "/api/trips/" + tripId, 
        method: "PATCH", 
        withCredentials: true,
        data: JSON.stringify(trip) 
    });
    return updatedTrip.data;
}

export async function deleteTrip(tripId: string) {
    await axios({
        url: "/api/trips/" + tripId,
        withCredentials: true,
        method: "DELETE"
    });
}