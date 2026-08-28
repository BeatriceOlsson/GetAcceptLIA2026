import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import { loginUser } from './controller/loginuser.js';
import KopplaUppTillDB from './config/DBConetion.js';
import userDataRouter from './routes/userData.js'
import createDocumentRouter from './routes/createDocument.js';
import getTemplateRouter from './routes/getTemplate.js';
import createFileRouter from './routes/createFile.js';
import isLogdInRouter from './routes/isLogdIn.js'
import cookieParser from 'cookie-parser';
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


app.listen(3000, () => {
    logger.info('Servern kör på port 3000');
})