import logger from "../config/logger.js";

export async function PostApiConnection({urlInput, postBody, req, res}){
    const token = req.cookies.auth_token;
    const api = process.env.API_URL;

    try{
        const response = await fetch(`${api}${urlInput}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postBody),
        })

        if(!response.ok) {
            logger.error(`Data motagen ej ok`, {status: response.status, errorDitail: data});
            return res.status(response.status).json({message: data.message || "Inlogning misluckades"})
        }

        const data= await response.json();

        res.status(200).json({ message: 'Datan har sparats', details: data});
    } catch (error) {
        logger.error('Fel uppstod vid sparande av data: ', { message: error.message, stack: error.stack });
        return res.status(500).json({ message: 'Fel uppstod vid sparande av data.' });
    }
}
