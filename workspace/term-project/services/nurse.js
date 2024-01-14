import { promisePool } from "../database/sql";

export const nurse = {
  getTreatments: async (data) => {
    const sql = `
            SELECT p.patient_id, DATE_FORMAT(e.treatment_date, '%Y-%m-%d_%H:%i:%s') AS treatment_date, p.name, p.phone_number, e.treatment_details
            FROM Patient p
            JOIN treatment e ON p.patient_id = e.patient_id
            WHERE e.nurse_id = ${data.nurse_id};
            `;
    const result = await promisePool.query(sql);
    return result[0];
  },
  insertTreatment: async (data) => {
    const sql = `
    INSERT INTO treatment (treatment_date, patient_id, nurse_id, treatment_details)
    VALUES (NOW(), ${data.patient_id}, ${data.nurse_id}, '${data.treatment_details}')
    `;
    console.log("insert query:", sql);
    await promisePool.query(sql);
  },
  updateTreatment: async (data) => {
    const datetime = data.treatment_date.replace(/_/g, " ");
    const sql = `
    UPDATE treatment
    SET treatment_details='${data.treatment_details}' 
    WHERE treatment_date='${datetime}'`;

    console.log("update query:", sql);
    await promisePool.query(sql);
  },
  deleteTreatment: async (data) => {
    const datetime = data.treatment_date.replace(/_/g, " ");
    const sql = `
    DELETE FROM treatment
    WHERE treatment_date='${datetime}'`;

    console.log("delete query:", sql);
    await promisePool.query(sql);
  },
};
