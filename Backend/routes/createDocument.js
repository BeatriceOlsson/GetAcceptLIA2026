import express from 'express';
import logger from '../config/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const  {name, file_ur, file_id, template_id, value, role = 'signer', recipients} = req.body;
    console.log(req.body);

    if(!name || name.length === 0) {
        return res.status(400).json({message:'Dokumentet behöver ha ett namn med minst ett tecken'});
    }

    if(!file_ur || !file_id || !template_id) {
        return res.status(400).json({message:'Behöver finas en fil eller template att skicka.'});
    }

    if(value===undefined || value===null) {
        return res.status(400).json({message:'Behöver finnas ett värde i dokumentet.'});
    }

    if(!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({message:'Behöver ha minst en motagare.'})
    }

    try {
        const response = await fetch('https://api.getaccept.com/v1/documents', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, value, role, recipients}),
        })
        const data = await response.json();

        if(!response.ok) {
            logger.error(`Data motagen ej ok`, {status: response.status, errorDitail: data});
            return res.status(response.status).json({message: data.message || "Dokument kunde inte sparas."})
        }

        res.json({message:'Dokument sparades.'});
    } catch (error) {
        logger.error('Fel vid sparande av dokument i GetAccept', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ message: 'Server problem vid inlogning' });
    }
})

export default router;