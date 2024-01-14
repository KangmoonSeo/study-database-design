import { promisePool } from "../database/sql";

export const patient = {
  getSpecialties: async () => {
    const sql = `
            SELECT name
            FROM medical_specialty
            `;

    const result = await promisePool.query(sql);
    return result[0];
  },
  getReservations: async (data) => {
    const sql = `
            SELECT r.reservation_number, m.name, DATE_FORMAT(r.reservation_date, '%Y-%m-%d_%H:%i:%s') AS reservation_date 
            FROM Reservation r
            JOIN Medical_specialty m ON r.department_id = m.department_id
            WHERE r.patient_id = ${data.patient_id}
            `;
    const result = await promisePool.query(sql);
    return result[0];
  },
  getInpatients: async (data) => {
    const sql = `
            SELECT room_id, DATE_FORMAT(admission_date, '%Y-%m-%d_%H:%i:%s') AS admission_date, DATE_FORMAT(discharge_date, '%Y-%m-%d_%H:%i:%s') AS discharge_date 
            FROM Inpatient
            WHERE patient_id = ${data.patient_id}
            `;
    const result = await promisePool.query(sql);
    return result[0];
  },

  insertReservation: async (data) => {
    const specialty_sql = `
    SELECT department_id
    FROM medical_specialty
    where name = '${data.department_name}'
    `;
    const specialty_result = await promisePool.query(specialty_sql);
    const department_id = specialty_result[0][0].department_id;

    const sql = `
    INSERT INTO Reservation (reservation_number, reservation_date, department_id, patient_id)
    VALUES (${data.reservation_number}, '${data.reservation_date}', ${department_id}, ${data.patient_id})
    `;
    try {
      console.log("insert query:", sql);
      await promisePool.query(sql);
      return true;

    } catch {
      console.log("insertion fallacy:", sql);
      return false;
    }
  },

  deleteReservation: async (data) => {
    const sql = `
    DELETE FROM Reservation
    WHERE reservation_number='${data.reservation_number}'`;

    console.log("delete query:", sql);
    await promisePool.query(sql);
  },
};
