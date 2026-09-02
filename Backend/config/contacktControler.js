import sql from 'mssql';
import KopplaUppTillDB from "./DBConetion.js";
import logger from "./logger.js";

const dbConection = KopplaUppTillDB();

async function addContact (userData) {
    try {
        const db = await dbConection;

        const saved = await db.request()
        .input('email', sql.VarChar(255), userData.email)
        .input('mobile', sql.VarChar(30), userData.mobile)
        .input('firstN', sql.VarChar(100), userData.firstName)
        .input('lastN', sql.VarChar(100), userData.lastName)
        .query(
            `INSERT INTO userContact (userEmail, userMobile, firstName, lastName)
            VALUES (@email, @mobile, @firstN, @lastN);`
        );

        logger.info('Ny kontackt sparades i db.');
        return saved;
    } catch (error) {
        throw error;
    }
}

async function getContact(userData) {
    try {
        const searchValue = (userData ?? '').trim();
        const db = await dbConection;

        if (!searchValue) {
            return [];
        }

        const result = await db.request()
            .input('email', sql.VarChar(255), `%${searchValue}%`)
            .query(`SELECT * FROM userContact WHERE userEmail LIKE @email ORDER BY userEmail`);

        return result.recordset || [];
    } catch (error) {
        throw error;
    }
}

export {addContact, getContact};