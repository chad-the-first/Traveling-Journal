// import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import env from "../util/validateEnve";
// import crypto from "crypto";
// import { RequestHandler } from "express";

export const Cloudinary = (cloudinary).v2;

Cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    api_key: env.CLOUDINARY_API,
    api_secret: env.CLOUDINARY_SECRET
});

interface cloudinaryOptions extends Options {
    params: {
        folder: string
    }
}

const multerOpts: cloudinaryOptions = {
    cloudinary: Cloudinary,
    params: {
        folder: "trips images",
    },
};

export const accountStorage = new CloudinaryStorage(multerOpts)


// const storage = new CloudinaryStorage({
//     cloudinary: Cloudinary,
//     params: async (req, file) => {
//         let buf: Buffer | string = crypto.randomBytes(16);
//         buf = buf.toString('hex');
//         let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
//         uniqFileName += buf;
//         return {
//             folder: 'trips images',
//             format: 'jpeg',
//             public_id: uniqFileName,
//         }
//     }
// });

// export const parser = multer({ storage: storage});

// export const deleteImage: RequestHandler = async (req, res, next) => {
//       cloudinary.v2.uploader.destroy("easy97151583952d8ed26c9bca795a902259", function(error,result) {
//         console.log(result, error) })
//         .then(resp => console.log(resp))
//         .catch(error=> console.log("Something went wrong, please try again later." + error));
//   }