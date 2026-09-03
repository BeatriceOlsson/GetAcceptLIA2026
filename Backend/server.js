import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import logger from './config/logger.js';
import { loginUser } from './controller/loginuser.js';
import KopplaUppTillDB from './config/DBConetion.js';
import userDataRouter from './routes/userData.js'
import createDocumentRouter from './routes/createDocument.js';
import getTemplateRouter from './routes/getTemplate.js';
import createFileRouter from './routes/createFile.js';
import isLogdInRouter from './routes/isLogdIn.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
KopplaUppTillDB();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
app.get('/', (req, res) => {
    res.json({message: "Hämta datta"});
})
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb' , extended: true}))
app.use(cookieParser());


app.post('/login', loginUser)
app.use('/isLogdIn', isLogdInRouter)
app.use('/userData', userDataRouter);
app.use('/createDocument', createDocumentRouter);
app.use('/template', getTemplateRouter);
app.use('/file', createFileRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info('Servern kör på port 3000');
})