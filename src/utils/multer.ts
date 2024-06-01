import multer, { diskStorage } from 'multer'
import path from 'path'

const videoStorage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-video-${file.originalname}`)
    }
})

const thumbnailStorage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/thumbnails/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-thumbnail-${file.originalname}`)
    }
})


export const videoUpload = multer({ 
    storage: videoStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('video')) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
 })
export const thumbnailUpload = multer({ storage: thumbnailStorage })