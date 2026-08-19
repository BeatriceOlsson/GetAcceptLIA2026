import express from 'express';
import logger from '../config/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const auToken = req.headers['authorization'];
    const token = auToken && auToken.split(' ')[1];

    if(!token) {
        return res.status(400).json({message: 'Behöver vara inlogad för att kuna gå vidare.'})
    }

    try {
        const response = await fetch('https://api.getaccept.com/v1/templates', {
            method: 'GET',
            headers: {'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const data = await response.json();

        if(!response.ok) {
            logger.error(`Template kunde inte hämtas `,{status: response.status, errorDitail: data})
            return res.status(response.status).json({message: 'Template data kunde inte hämtas koreckt'});
        }
return res.status(200).json(data);
    } catch (error) {
        logger.error(`Fel vid hämtning av Templats: `, {message: error.message})
    }
})

export default router;