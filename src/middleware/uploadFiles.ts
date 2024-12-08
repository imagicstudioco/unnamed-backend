import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
// config
import cloudinary from "@/config/cloudinary";
// utils/errors
import { FileUploadError } from "@/utils/errors";

const acceptedImageMimeTypes = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const maxFileSize = 15 * 1024 * 1024;

export const uploadCampaignImageMedia = multer({
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!acceptedImageMimeTypes.includes(file.mimetype)) {
      return cb(
        new FileUploadError(
          `File Upload only supports the following file types ${JSON.stringify(
            acceptedImageMimeTypes
          )}`
        )
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: maxFileSize,
  },
  storage: new CloudinaryStorage({
    cloudinary,
    params: (req: Request, file: Express.Multer.File) => {
      return {
        folder: "campaign/image/",
        public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      };
    },
  }),
});

export const uploadUserAvatarMedia = multer({
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!acceptedImageMimeTypes.includes(file.mimetype)) {
      return cb(
        new FileUploadError(
          `File Upload only supports the following file types ${JSON.stringify(
            acceptedImageMimeTypes
          )}`
        )
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: maxFileSize,
  },
  storage: new CloudinaryStorage({
    cloudinary,
    params: (req: Request, file: Express.Multer.File) => {
      return {
        folder: "user/avatar/",
        public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      };
    },
  }),
});
