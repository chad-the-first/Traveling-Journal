import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: str(),
    SESSION_SECRET: str(),
    CLOUD_NAME: str(),
    CLOUDINARY_SECRET: str(),
    CLOUDINARY_API: str()
})