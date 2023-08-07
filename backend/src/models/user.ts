import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false},
    password: {type: String, required: true, select: false} 
});

type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema);