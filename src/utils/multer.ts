import { Request } from 'express';

import multer from "multer";
import path from "path";
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (_req: Request, file, cb) => {
        console.log( "req.file", file );
        
        const uploadDirectory = path.join(__dirname, '../public/images')
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        cb(null, uploadDirectory);
    },
    filename: (_req: Request, file, cb) => {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

export const  multerMid = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024 // 10MB
    }
});