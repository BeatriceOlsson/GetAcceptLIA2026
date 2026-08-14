import logger from '../config/logger.js';

async function loginUser ( req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        logger.info('Försökte logga in utan email eller lösenord.');
        return res.status(400).json({ message: 'Både lösenord och email behöver vara ifyllda.' });
    }

    try {
        const response = await fetch('https://api.getaccept.com/v1/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password})
        });

        const data= await response.json();
        if(!response.ok) {
            logger.error(`Data motagen ej ok`, {status: response.status, errorDitail: data});
            return res.status(response.status).json({message: data.message || "Inlogning misluckades"})
        }

        if (!data || !data.access_token) {
            logger.error('GetAccept auth succeeded but token is missing', {
                responseBody: data
            });
            return res.status(400).json({message: 'Inlogning lyckades men token saknas.'});
        }

        res.json({message: `Inlogning lyckades`, token: data.access_token, expiers: data.expiers_in});
    } catch (error) {
        logger.error('Fel vid hämtning av token från GetAccept', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ message: 'Server problem vid inlogning' });
    }
};


export {loginUser};