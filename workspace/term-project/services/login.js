import { promisePool } from "../database/sql";
import { encrypt } from "./encrypt";

async function login(data) {
  const FALSE_DATA = { id: "", pw: "", role: "" };
  const hashed_pw = encrypt(data.pw);
  
  if (data.role == "admin") {
    if (
      data.id == "admin" &&
      hashed_pw == "SOfFv8YGpLkeeREq2Lz/qTn9m9MqEihfQLEfSYPrTuA="
    )
      return data;
    return FALSE_DATA;
  } else if (Number.isNaN(Number.parseInt(data.id))) {
    console.log(`invalid ID format: >${data.id}<`);
    return FALSE_DATA;
  }
  const id = Number.parseInt(data.id);

  const role = data.role;

  if (role == "doctor" || role == "nurse" || role == "patient") {
    const sql = `
    SELECT password, name
    FROM ${role} 
    where ${role}_id = ${id}`;
    const query_result = await promisePool.query(sql);
    if (query_result[0][0] == null) {
      console.log("NO ID : ", role, id);
      return FALSE_DATA;
    }

    const query_name = query_result[0][0].name;
    const query_pw = query_result[0][0].password;
    if (hashed_pw != query_pw) {
      console.log("NO PW : ", role, id);
      return FALSE_DATA;
    } else {
      console.log("login success: ", role, id);
      data.name = query_name;

      return data;
    }
  }
  return FALSE_DATA;
}

export { login };
