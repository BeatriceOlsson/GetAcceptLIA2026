import express from 'express';
import multer from 'multer'
import logger from '../config/logger.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

router.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    const auToken = req.headers['authorization'];
    
    const token = auToken ? auToken.replace(/bearer/i, '').trim() : null;

    if(!file) {
        return res.status(400).json({message: 'Fil saknas.'});
    }
    
   if (!token || token === 'undefined') {
        return res.status(401).json({ message: 'Behöver vara inloggad för att kunna gå vidare.' });
    }

    try {
        const formData = new FormData();
        const fileBlob = new Blob([file.buffer], { type: file.mimetype });
        formData.append('file', fileBlob, file.originalname);

        const response = await fetch('https://api.getaccept.com/v1/upload', {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            body: formData,
        });

        if(!response.ok) {
            const errBody = await response.text().catch(() => '');
            logger.error('Fil kunde inte skapas', { status: response.status, body: errBody });
            return res.status(response.status).json({ message: 'Filen kunde inte sparas' });
        }

        const data = await response.json().catch(() => ({}));
        return res.json({ message: 'Filen sparades.', details: data });
    } catch (err) {
        logger.error('Fel uppstod vid sparande av fil: ', { message: err.message, stack: err.stack });
        return res.status(500).json({ message: 'Något gick fel vid sparande av fil.' });
    }
})

export default router;