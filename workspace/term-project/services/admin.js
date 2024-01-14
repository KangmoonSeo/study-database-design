import { promisePool } from "../database/sql";
import { encrypt } from "./encrypt";

export const admin = {
  select: async (data) => {
    const sql = `
    SELECT ${data.role}_id, department_id, name, address, phone_number 
    FROM ${data.role}
    LIMIT 100
    `;
    const result = await promisePool.query(sql);
    return result[0];
  },
    insert: async (data) => {
      const pw = encrypt("inha"); // 초기 비밀번호
      const sql = `
      INSERT 
      INTO ${data.role} (${data.role}_id, department_id, 
        name, address, phone_number, password)
      VALUES (${data.id}, ${data.department_id}, '${data.name}', 
      '${data.address}', '${data.phone_number}', '${pw}')
      `;
      try {
        await promisePool.query(sql);
        return true;
      } catch {
        console.log(`duplicate key ${data.id} detected`);
        return false;
      }
    },
  update: async (data) => {
    const sql = `
    UPDATE ${data.role} 
    SET department_id=${data.department_id}, name='${data.name}', 
    address='${data.address}', phone_number='${data.phone_number}' 
    WHERE ${data.role}_id=${data.id}`;
    try {
      await promisePool.query(sql);
      return true;
    } catch {
      console.log(`no matching key ${data.id} detected`);
      return false;
    }
  },
  delete: async (data) => {
    const sql = `
    DELETE 
    FROM ${data.role} 
    WHERE ${data.role}_id=${data.id}
    `;
    try {
      await promisePool.query(sql);
      return true;
    } catch {
      console.log(`no matching key ${data.id} detected`);
      return false;
    }
  },
};
