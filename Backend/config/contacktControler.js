import sql from 'mssql';
import KopplaUppTillDB from "./DBConetion.js";
import logger from "./logger.js";

const dbConection = KopplaUppTillDB();

async function addContact (userData) {
    try {
        const db = await dbConection;
        const email = userData.userEmail ?? userData.email;
        const mobile = userData.userMobile ?? userData.mobile;
        const firstN = userData.firstName ?? userData.firstN ?? null;
        const lastN = userData.lastName ?? userData.lastN ?? null;

        const saved = await db.request()
        .input('email', sql.VarChar(255), email)
        .input('mobile', sql.VarChar(30), mobile)
        .input('firstN', sql.VarChar(100), firstN)
        .input('lastN', sql.VarChar(100), lastN)
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
        const db = await dbConection;
        const email = userData?.userEmail ?? userData?.email;

        const fetch = await db.request()
        .input('email', sql.VarChar(255), email)
        .query(`SELECT * FROM userContact WHERE userEmail = @email`)

        if(fetch.recordset.length === 0) {
            return null;
        }

        return fetch.recordset[0];
    } catch (error) {
        throw error;
    }
}

export {addContact, getContact};