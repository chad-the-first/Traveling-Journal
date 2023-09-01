import { InferSchemaType, Schema, model } from "mongoose";


const tripSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true},
    title: { type: String, required: true },
    body: { type: String, required: true },
    location: String,
    image: String,
    image_Id: String,
    route: String,
    author: String,
    meta: {
        votes: Number,
        favs: Number
      }
}, { timestamps: true });

type Trip = InferSchemaType<typeof tripSchema>;

export default model<Trip>("Trip", tripSchema);