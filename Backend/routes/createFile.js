import express from 'express';
import multer from 'multer'
import logger from '../config/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { file_name, file_content } = req.body;
    const token = req.cookies.auth_token;

    if (!file_name || !file_content) {
        return res.status(400).json({ message: 'Fil saknas.' });
    }

    if (!token || token === 'undefined') {
        return res.status(401).json({ message: 'Behöver vara inloggad för att kunna gå vidare.' });
    }

    try {
        const file = {file_name: file_name, file_content: file_content};

        const response = await fetch('https://api.getaccept.com/v1/upload', {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(file),
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