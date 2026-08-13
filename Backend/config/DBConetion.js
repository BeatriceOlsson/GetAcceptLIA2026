import { Connection } from "tedious";
import logger from "./logger.js";


const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'Gaia',
        }
    },
    options: {
        port: 1433,
        database: 'GetAcceptDB2026',
        trustServerCertificate: true
    }
}

function KopplaUppTillDB () {
    const connection = new Connection(config);

    connection.on('connect', (error) => {
        if (error) {
            logger.error(`DB kunde inte connecta: ${error}`);
        } else {
            logger.info('DB conected');
        }
    });

    connection.connect();

    return connection;
}

export default KopplaUppTillDB;