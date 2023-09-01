import { RequestHandler } from "express-serve-static-core";
import { imageUploader } from "../util/imageUploader";

export const avatarUpload: RequestHandler = (req, res, next) => {
    const upload = imageUploader(
        ["image/jpeg", "image/jpg", "image/png"],
        10000000,
        1,
        "Only .jpeg, .jpg or .png format allowed."
    );

    upload.any()(req, res, (err) => {
        if (err) {
          // sending json error response
          res.status(500).json({
            errors: {
              avatar: {
                msg: err.message,
              },
            },
          });
        } else {
          // go to the next function
          next();
        }
      });
}

