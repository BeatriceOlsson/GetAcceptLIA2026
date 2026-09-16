import KopplaUppTillDB from "./DBConetion.js";
import sql from 'mssql';
import logger from "./logger.js";
import { addContact, getContact } from "./contacktControler.js";

const dbConection = KopplaUppTillDB();

async function addSentDocument(documentRes) {
    const documentId = documentRes.id;
    const recipientsEmail = documentRes.recipients.map(r => r.email);

    try {
        const db = await dbConection;

        for(const email of recipientsEmail) {
        const matching = await getContact(email);
        if(matching.length === 0) {
            const userData = documentRes.recipients.find(r => r.email === email);
            const newUserContact = {
                email: userData.email,
                mobile: userData.mobile,
                firstName: userData.first_name,
                lastName: userData.last_name,
            }
            
            await addContact(newUserContact);
        }
    }

        const saved = await db.request()
         .input("documentId", sql.VarChar(50), documentId)
         .input("docValue", sql.Decimal(10,2), documentRes.value)
         .input("dateSent", sql.Date, documentRes.created_at)
         .query(
            `INSERT INTO dockument (dockumentID, dateSent, docValue)
            VALUES (@documentId, @dateSent, @docValue)`
         )

        for(const email of recipientsEmail){
            await db.request()
            .input("documentId", sql.VarChar(50), documentId)
            .input("recipientsEmail", sql.VarChar(255), email)
            .query(
                `INSERT INTO skickadeDockument (dockumentID, userEmail)
                VALUES (@documentId, @recipientsEmail);`
            )
            logger.info('Ny kontackt sparades i db.');
         }
        return saved;
    } catch (error) {
        throw error;
    }
}

async function getDokumentUser(userEmail) {

    try {
        const db = await dbConection;
        const result = await db.request()
        .input('userEmail', sql.VarChar(50), userEmail)
        .query(`SELECT sd.dockumentID, u.userEmail
            FROM skickadeDockument sd LEFT JOIN userContact u ON sd.userEmail = u.userEmail
            WHERE sd.userEmail =  @userEmail`)

            return result.recordset || [];
    } catch (error) {
        throw error
        
    }
}

async function getDokumnetId() {
    try {
        const db = await dbConection;
        
        const result = await db.request()
        .query(`SELECT dockumentID FROM dockument`)

        return result.recordset || [];
    } catch (error) {
        logger.error(error);
    }
}


export {addSentDocument, getDokumentUser, getDokumnetId}; 