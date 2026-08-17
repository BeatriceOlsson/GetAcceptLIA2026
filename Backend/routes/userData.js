import express from 'express';
import { addContact, getContact } from '../config/contacktControler.js';
import logger from '../config/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const searchUser = req.query.s ?? '';
        const data = await getContact(searchUser);
        res.status(200).json({ message: 'Contackt hittades', data });
    } catch (error) {
        res.status(500).json({ message: 'Kontackt kunne inte hittas.' });
    }
})

router.post('/', async (req, res) => {
    
    const email = req.body.email ?? req.body.userEmail;
    const mobile = req.body.mobile ?? req.body.userMobile;
   
    if(!email || !mobile) {
        return res.status(400).json({ message:'Email och mobile behöver vara ifylt.'})
    }

    let mailCheck =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!mailCheck.test(email)) {
        return res.status(400).json({message: 'Mailen godkändes inte.'})
    }

    try {
        const data = await addContact(req.body);
        res.status(201).json({ message: 'Kontackt sparad.', data: data});
    } catch (error) {
        logger.error(`Kontackt kunde inte sparas: ${error.message}`);
        res.status(500).json({ message: 'Kontackt kunde inte sparas.'});
    }
  
})

export default router;