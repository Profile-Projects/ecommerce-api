const { Pool, Client } = require("pg");

const config = require("./getConfig");

const dbConfig = config["database"];

const fs = require('fs');

console.log(` dbconfig : ${JSON.stringify(dbConfig)}`);

const pool = new Pool({
    user: "santhosh",
    host: dbConfig.host,
    database: dbConfig.name,
    password: dbConfig.password,
    port: 5432,
    // ssl: {
    //     ca: fs.readFileSync('./database/global-bundle.pem').toString(),
    // }
});

async function connectWithRetries(maxRetries, retryInterval, text, params) {
    let retries = 0;
    const maxAttempts = maxRetries + 1;
    let client;

    while (retries < maxAttempts) {
        try {
        client = await pool.connect();
        return  await client.query(text, params); // Successful connection, exit the function
        } catch (error) {
            console.error(`Attempt ${retries + 1} failed: ${error.message}`);
            retries++;
            if (retries < maxAttempts) {
                console.log(`Retrying connection after ${retryInterval}ms...`);
                await new Promise(resolve => setTimeout(resolve, retryInterval));
            } else {
                console.error('Connection failed after max retries.');
                throw error;
            }
        } finally{
            if(client)
                client.release();
        }
    }
};


module.exports = {
    query: (text, params) =>  connectWithRetries(3, 2000, text, params)
};
