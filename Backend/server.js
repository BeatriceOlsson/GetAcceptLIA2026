import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import { loginUser } from './controller/loginuser.js';
import KopplaUppTillDB from './config/DBConetion.js';
import userDataRouter from './routes/userData.js'
import createDocumentRouter from './routes/createDocument.js';
import getTemplateRouter from './routes/getTemplate.js';

const app = express();
KopplaUppTillDB();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Hämta datta"});
})

app.post('/login', loginUser)
app.use('/userData', userDataRouter);
app.use('/createDocument', createDocumentRouter);
app.use('/template', getTemplateRouter);

app.listen(3000, () => {
    logger.info('Servern kör på port 3000');
})