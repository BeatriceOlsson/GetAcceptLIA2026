import express from 'express';
import logger from '../config/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const  {name, file_ur, file_id, template_id, value, recipients} = req.body;
    console.log('request headers:', req.headers);
    console.log('request body keys:', Object.keys(req.body || {}));
    console.log(req.body);

        const handelRecipients = Array.isArray(recipients) ? recipients.map( person => ({
            first_name: person.firstName,
            last_name: person.lastName,
            email: person.email,
            role: person.role || 'Signer'
        })).filter(p => p.email) : [];
        
console.log(handelRecipients);
    const apiStrucktur = {
        name: name,
        file_url: "",
        file_ids:"",
        value: Number(value),
        recipients: handelRecipients
    }

    if(!name || name.length === 0) {
        console.log("Namn saknas, ger felmedelande");
        return res.status(400).json({message:'Dokumentet behöver ha ett namn med minst ett tecken'});
    }

    if(!file_ur && !file_id && !template_id) {
        console.log("Fil saknas, ger felmedelande");
        return res.status(400).json({message:'Behöver finas en fil eller template att skicka.'});
    }

    if(value===undefined || value===null) {
        console.log("värde saknas, ger felmedelande");
        return res.status(400).json({message:'Behöver finnas ett värde i dokumentet.'});
    }

    if(!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        console.log("Motagare saknas: ger felmedelande");
        return res.status(400).json({message:'Behöver ha minst en motagare.'})
    }

    try {
        const response = await fetch('https://api.getaccept.com/v1/documents', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiStrucktur),
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