import { promisePool } from "../database/sql";

export const doctor = {
  getExaminations: async (data) => {
    const sql = `
            SELECT p.patient_id, DATE_FORMAT(e.examination_date, '%Y-%m-%d_%H:%i:%s') AS examination_date, p.name, p.phone_number, e.examination_details
            FROM Patient p
            JOIN Examination e ON p.patient_id = e.patient_id
            WHERE e.doctor_id = ${data.doctor_id}
            LIMIT 100
            `;
    const result = await promisePool.query(sql);
    return result[0];
  },
  insertExamination: async (data) => {
    const sql = `
    INSERT INTO Examination (examination_date, patient_id, doctor_id, examination_details)
    VALUES (NOW(), ${data.patient_id}, ${data.doctor_id}, '${data.examination_details}')
    `;
    console.log("insert query:", sql);
    await promisePool.query(sql);
  },
  updateExamination: async (data) => {
    const datetime = data.examination_date.replace(/_/g, " ");
    const sql = `
    UPDATE Examination
    SET examination_details='${data.examination_details}' 
    WHERE examination_date='${datetime}'`;

    console.log("update query:", sql);
    await promisePool.query(sql);
  },
  deleteExamination: async (data) => {
    const datetime = data.examination_date.replace(/_/g, " ");
    const sql = `
    DELETE FROM Examination
    WHERE examination_date='${datetime}'`;

    console.log("delete query:", sql);
    await promisePool.query(sql);
  },
};
