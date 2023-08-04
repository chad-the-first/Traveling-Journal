export interface Trip {
    _id: string,
    title: string,
    body: string,
    author?: string,
    meta?: object,
    createdAt: string,
    updatedAt: string,
}