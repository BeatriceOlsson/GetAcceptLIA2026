import express from 'express';
import multer from 'multer'
import logger from '../config/logger.js';
import { PostApiConnection } from '../service/postApiConnection.js';

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

    const file = {file_name: file_name, file_content: file_content};
    const postData= await PostApiConnection({
        urlInput: '/v1/upload',
        postBody: file,
        req: req,
        res: res,
    })

})

export default router;