export interface Trip {
    _id: string,
    image: string,
    title: string,
    body: string,
    location: string,
    route: string,
    author?: string,
    meta?: object,
    createdAt: string,
    updatedAt: string,
}