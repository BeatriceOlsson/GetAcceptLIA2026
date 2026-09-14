import express from 'express';
import logger from '../config/logger.js';
import { PostApiConnection } from '../service/postApiConnection.js';
import { addSentDocument, getDokumentUser } from '../config/documentControler.js'
import { getDokumentPreview } from '../config/getDokumentController.js';

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

    const trimValue = value.trim("");
    const numberValue = Number(trimValue);

    if(!value) {
        return res.status(400).json({message:'Behöver finnas ett värde i dokumentet.'});
    }
    
    if(!file_ids && !template_id) {
        return res.status(400).json({message:'Behöver finas en fil eller template att skicka.'});
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

    addSentDocument(postData);

    } catch (error) {
        logger.error('Fel vid sparande av dokument i GetAccept', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ message: 'Problem vid skapapnde av dockument' });
    }

})

router.post('/documentUser', async (req , res) => {
    const {userEmail} = req.body;

    if(!userEmail || typeof userEmail !== 'string') {
        return res.status(400).json({message: "Datan som motogs är ej acepterad."})
        logger.error("Anrop till db med mistänksam id: ", id)
    }

    const strukturOfMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!strukturOfMail.test(userEmail)) {
        return res.status(400).json({message: "De skcikade id kan bara bestå av sifror och bokstäver."});
        logger.error("Anrop till db innehöl mistänksama täckn. ", id);
    }
    try {
        const userDockument = await getDokumentUser(userEmail);


        const dockumentPreview = await getDokumentPreview(userDockument, req);
        
        return res.status(200).json(dockumentPreview);
    } catch (error) {
        logger.error("Fel vid hämtning av dockument data: ", error);
        return res.status(500).json({message: "Fel uppstog i server vid hämtning av data."})
    }
})

router.get('/dockumentId', async (req, res) => {
    try {
        const dockumentId = await getDokumnetId();

        return res.status(200).json(dockumentId);
    } catch (error) {
        logger.error("Fel vid hämtning av dockument data: ", error);
        return res.status(500).json({message: "Fel uppstog i server vid hämtning av data."})
    }
})


export default router;