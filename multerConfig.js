import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log('File original name:', file.originalname);

        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        console.log('File mime type:', file.mimetype);
        console.log('File extension:', path.extname(file.originalname).toLowerCase());

        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

export default upload;
