import express from 'express';
import logger from '../config/logger.js';
import { GetApiConnection } from '../service/getApiConnection.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.cookies.auth_token;

    if(!token) {
        return res.status(400).json({message: 'Behöver vara inlogad för att kuna gå vidare.'})
    }

    const getData = await GetApiConnection({
        urlInput:'/v1/templates',
        req: req,
        res: res
    })
  
})

export default router;