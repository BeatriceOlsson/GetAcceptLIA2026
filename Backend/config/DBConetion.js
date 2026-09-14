import sql from 'mssql';
import logger from './logger.js';
import 'dotenv/config';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
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