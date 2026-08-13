import sql from 'mssql';
import logger from './logger.js';

const config = {
    user: 'sa',
    password: 'Gaia',
    server: 'localhost',
    port: 1433,
    database: 'GetAcceptDB2026',
    options: {
        trustServerCertificate: true
    }
};

function KopplaUppTillDB() {
    return sql.connect(config)
        .then(pool => {
            logger.info('DB connected');
            return pool;
        })
        .catch(error => {
            logger.error(`DB kunde inte connecta: ${error.message}`);
            throw error;
        });
}

export default KopplaUppTillDB;