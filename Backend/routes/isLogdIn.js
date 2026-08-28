import express from 'express';

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

    return res.status(200).json({ message: 'Utlogad'});
})

export default router;