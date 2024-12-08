declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      walletAddress: string;
      name?: string;
      email?: string;
      avatar?: {
        path: string;
        publicId: string;
      };
    };
    file?: Express.Multer.File;
  }
  export interface Response {
    user: any;
  }
}

declare module 'multer-storage-cloudinary' {
  import { CloudinaryStorage } from 'multer-storage-cloudinary';
  export { CloudinaryStorage };
}
