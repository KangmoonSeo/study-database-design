import mysql from 'mysql2';
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'inha',
});

const promisePool = pool.promise();

export const ApplyQuery = {
    applyquery: async (Query) => {
        const sql = Query;

        const [result] = await promisePool.query(sql);
        return result;
    },
};
