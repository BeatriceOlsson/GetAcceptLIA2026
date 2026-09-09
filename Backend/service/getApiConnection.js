import { error } from "node:console";
import logger from "../config/logger.js";

export async function GetApiConnection({urlInput, req}) {
    const token = req.cookies.auth_token;
    const api = process.env.API_URL;
    
    try {
        const response = await fetch(`${api}${urlInput}`, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`},
        })
     
        if(!response.ok) {
            logger.error('Kunde inte hämta data: ', { status: response.status, body: errorText });
            return new Error( 'Error: ', response.status);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        logger.error('Fel uppstod vid hämtning av data: ', { message: error.message, stack: error.stack });
        return res.status(500).json({ message: 'Fel uppstod vid hämtning av data.' });
    }
}