import { promisePool } from "../database/sql";

export const search = {
  getPatients: async (data) => {
    const cond = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) =>
        typeof value === "string"
          ? `${key} LIKE '${value}%'`
          : `${key} = ${value}`
      );
    const where_query =
    cond.length > 0 ? `WHERE ${cond.join(" AND ")}` : "";
    const sql = `
          select * 
          from Patient
          ${where_query}
          LIMIT 100
        `;
    const result = await promisePool.query(sql);
    return result[0];
  },
};
