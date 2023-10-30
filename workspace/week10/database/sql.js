import mysql from 'mysql2';

require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'week10',
});

const promisePool = pool.promise();

export const selectSql = {
    getUser: async () => {
        const sql = `select * from user`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getDepartment: async () => {
        const sql = `select * from department`;
        const [result] = await promisePool.query(sql);
        return result;
    },
}

export const deleteSql = {
    deleteDepartment: async (data) => {
        console.log('delete department Dnumber =', data);
        const sql = `delete from department where Dnumber=${data.Dnumber}`
        console.log(sql);
        await promisePool.query(sql);
    },
};
