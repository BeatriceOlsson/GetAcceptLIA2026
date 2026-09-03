import express from 'express';
import logger from '../config/logger.js';
import { PostApiConnection } from '../service/postApiConnection.js';

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

    if(!file_ur && !file_ids && !template_id) {
        return res.status(400).json({message:'Behöver finas en fil eller template att skicka.'});
    }

    if(value===undefined || value===null) {
        return res.status(400).json({message:'Behöver finnas ett värde i dokumentet.'});
    }

    if(!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({message:'Behöver ha minst en motagare.'})
    }

    try {
     const postData = await PostApiConnection({
        urlInput: '/v1/documents',
        postBody: apiStrucktur,
        req: req,
        res: res,
    })   

    } catch (error) {
        logger.error('Fel vid sparande av dokument i GetAccept', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ message: 'Server problem vid inlogning' });
    }

})

export default router;