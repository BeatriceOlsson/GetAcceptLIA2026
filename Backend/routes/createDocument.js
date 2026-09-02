import express from 'express';
import logger from '../config/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const  {name, file_ur, file_ids, template_id, value, recipients} = req.body;

        const handelRecipients = Array.isArray(recipients) ? recipients.map( person => ({
            first_name: person.firstName,
            last_name: person.lastName,
            email: person.email,
            role: person.role || 'signer'
        })).filter(p => p.email) : [];
        
    const apiStrucktur = {
        name: name,
        file_ids: file_ids,
        template_id: template_id,
        value: Number(value),
        is_automatic_sending: true,
        recipients: handelRecipients
    }
    //console.log("Api Struktur", apiStrucktur);

    if(!name || name.length === 0) {
        return res.status(400).json({message:'Dokumentet behöver ha ett namn med minst ett tecken'});
    }

    if(!file_ur || !file_ids || !template_id) {
        return res.status(400).json({message:'Behöver finas en fil eller template att skicka.'});
    }

    if(value===undefined || value===null) {
        return res.status(400).json({message:'Behöver finnas ett värde i dokumentet.'});
    }

    if(!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({message:'Behöver ha minst en motagare.'})
    }

    try {
        const token = req.cookies.auth_token;

        if(!token) {
            return res.status(401).json({ message: "Du måste vara inloggad för att spara dokument." });
        }

        const response = await fetch('https://api.getaccept.com/v1/documents', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(apiStrucktur),
        })

        // Some responses may have an empty body (204) or non-JSON body; read as text first
        const text = await response.text();
        //console.log("Svar tillabcka: ", text)

        if(!response.ok) {
            //console.log({status: response.status, errorDitail: data});
            logger.error(`Data motagen ej ok`, {status: response.status, errorDitail: data});
            return res.status(response.status).json({message: (data && data.message) || "Dokument kunde inte sparas."})
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