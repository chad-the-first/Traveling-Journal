import { Trip } from "../models/trip";
import { User } from "../models/user";
import axios from "axios";

axios.defaults.baseURL = 'https://traveling-journal-backend.onrender.com';
axios.defaults.withCredentials = true;


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
        headers: {
            'content-type': "application/json"
        },
        data: JSON.stringify(credentials),
    })
    return res.data;
}

export async function logIn(credentials: SignupCredentials): Promise<User> {
    const res = await axios({
        url: "/api/users/login", 
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
        data: JSON.stringify(credentials),
    });
    return res.data;
}

export async function logOut() {
    await axios({
        url: "/api/users/logout", 
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
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
        url: "/api/trips/" + tripId, 
        method: "GET"
      });
      return res.data;
}

export async function fetchMyTrips(): Promise<Trip[]> {
    const res = await axios({
        url: "/api/trips/my-trips", 
        method: "GET"
      });
      return res.data;
}

export async function uploadImage(image: object) {
    const res = await axios.post('/api/images', image);
    return res.data;
}

export interface TripInput {
    image: string,
    title: string,
    body: string,
    location: string,
    route: string,
    author?: string,
} 

export async function createTrip(trip: any): Promise<Trip> {
    const res = await axios({
        url: "/api/trips", 
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
        data: trip,
    });
    return res.data;
}

export async function updateTrip(tripId: string, trip: TripInput): Promise<Trip> {
    const updatedTrip = await axios({
        url: "/api/trips/" + tripId, 
        method: "PATCH", 
        data: trip,
    });
    return updatedTrip.data;
}

export async function deleteTrip(tripId: string) {
    await axios({
        url: "/api/trips/" + tripId,
        method: "DELETE"
    });
}