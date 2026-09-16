import KopplaUppTillDB from "./DBConetion.js";
import sql from 'mssql'

const dbConection = KopplaUppTillDB();

async function getUserSentDockumentDate () {

    try {
        const db = await dbConection;
        const result = await db.request()
        .query(`SELECT sd.userEmail,d.dockumentID, d.dateSent, d.docValue, u.userEmail , u.firstName, u.lastName
                FROM skickadeDockument sd INNER JOIN dockument d ON sd.dockumentID = d.dockumentID
                INNER JOIN userContact u ON sd.userEmail = u.userEmail;`);

            return result.recordset || [];
    } catch (error) {
        throw error;
    }
}

async function filterOnDateGetDockument (startDate, endDate) {

    try {
        const db = await dbConection;
        const result = await db.request()
        .input('startDate', sql.Date(), startDate)
        .input('endDate', sql.Date(), endDate)
        .query(`SELECT sd.userEmail,d.dockumentID, d.dateSent, d.docValue, u.userEmail , u.firstName, u.lastName
                FROM skickadeDockument sd INNER JOIN dockument d ON sd.dockumentID = d.dockumentID
                INNER JOIN userContact u ON sd.userEmail = u.userEmail
                WHERE dateSent BETWEEN @startDate AND @endDate;`)

        return result.recordset || [];
    } catch (error) {
        throw error;
    }
}

export {getUserSentDockumentDate, filterOnDateGetDockument};