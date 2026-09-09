import express from 'express';
import { loginUser } from '../controller/loginuser.js';
import logger from '../config/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.cookies.auth_token;

    if(!token) {
        return res.status(401).json({ message: "Är ej inlogad."});
    }

    return res.status(200).json({ isAuthenticated: true });
})

router.post('/', async (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    res.clearCookie('save_emial', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    res.clearCookie('save_password', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    return res.status(200).json({ message: 'Utlogad'});
})

router.get('/refresh', async (req, res) => {
    const emailCookie = req.cookies.save_email;
    const passwordCookie = req.cookies.save_password;

    if(!emailCookie && !passwordCookie) {
        return res.status(401).json({message: 'Inlognings uppgifter saknades'})
    };
    req.body = { email: emailCookie, password: passwordCookie}

    logger.info(`Kör automatisk refresh för användare`);

    return loginUser(req, res);
})

export default router;