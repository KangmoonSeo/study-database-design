import mysql from 'mysql2';
import { pool_info } from './pool_info';
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: pool_info.user,
    password: pool_info.password,
    database: pool_info.database,
});

const promisePool = pool.promise();

export const ApplyQuery = {
    applyquery: async (Query) => {
        const sql = Query;

        const [result] = await promisePool.query(sql);
        return result;
    },
};
