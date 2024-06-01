import { v2 as cloudinary } from 'cloudinary';
console.log(process.env.API_KEY);


cloudinary.config({

    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary
