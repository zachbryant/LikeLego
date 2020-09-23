import fs from 'fs';

export default {
    credentials: {
        key: fs.readFileSync('./ssl.key', 'utf-8'),
        cert: fs.readFileSync('./ssl/certificate', 'utf-8'),
    },
    port: process.env.sslPort || 8443,
};
