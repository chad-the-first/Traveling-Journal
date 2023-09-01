import multer from "multer";
import { accountStorage } from "../config/cloudinary.config";

export const imageUploader = (
    allowed_files_types: string | string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    max_file_size: any,
    max_number_of_upload_file: number,
    error_msg: string | undefined
) => {

    const upload = multer({

        storage: accountStorage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (req.files && typeof req.files.length == "number") {
                if(req.files.length > max_number_of_upload_file) {
                    cb(new Error(`Maximum ${max_number_of_upload_file} files are allowed to upload.`))
                } else {
                    if(allowed_files_types.includes(file.mimetype)) {
                        cb(null, true);
                    } else {
                        cb(new Error(error_msg));
                    }
                }
            }
        }

    })
    return upload;
}
