import fs from "fs/promises";
import faker from "faker";
import Inko from "inko";

let inko = new Inko();

function format(data) {
  const values = Object.entries(data)
    .map(([key, value]) =>
      typeof value === "string" ? `${key}='${value}'` : `${key}=${value}`
    )
    .join(", ");
  return values;
}

const MAX_PATIENT = 400000;
const uniquePhoneNumbers = new Set();
const uniqueSSN = new Set();

let sqlQueries = "";
for (let i = 1; i <= MAX_PATIENT; i++) {
  let phoneNumber;
  do {
    phoneNumber = `010-${faker.datatype.number({ min: 1000, max: 9999 })}`;
    phoneNumber += `-${faker.datatype.number({ min: 1000, max: 9999 })}`;
  } while (uniquePhoneNumbers.has(phoneNumber));
  uniquePhoneNumbers.add(phoneNumber);
  let ssn;
  do {
    ssn = `${faker.datatype.number({ min: 0, max: 99 })}`.padStart(2, "0");
    ssn += `${faker.datatype.number({ min: 1, max: 12 })}`.padStart(2, "0");
    ssn += `${faker.datatype.number({ min: 1, max: 30 })}`.padStart(2, "0");
    ssn += `-${faker.datatype.number({ min: 1000000, max: 3999999 })}`;
  } while (uniqueSSN.has(ssn));
  uniqueSSN.add(ssn);

  faker.locale = "ko";
  let sfname = faker.name.firstName();
  let slname = faker.name.lastName();
  let sname = slname + sfname;

  let doctor_id = null;
  let nurse_id = null;
  if (i < 1000) {
    doctor_id = faker.datatype.number({ min: 100, max: 130 });
    nurse_id = faker.datatype.number({ min: 200, max: 230 });
  }

  const fakeData = {
    patient_id: 1000000 + i,
    doctor_id: doctor_id,
    nurse_id: nurse_id,
    name: sname,
    ssn: ssn,
    gender: faker.random.arrayElement(["남", "여"]),
    address: faker.address.streetAddress(), // 한국 주소
    blood_type:
      faker.random.arrayElement(["RH+", "RH-"]) +
      faker.random.arrayElement(["A", "B", "O", "AB"]),
    height: faker.datatype.float({ min: 150.01, max: 200.99 }),
    weight: faker.datatype.float({ min: 50.01, max: 120.99 }),
    phone_number: phoneNumber,
    password: "SOfFv8YGpLkeeREq2Lz/qTn9m9MqEihfQLEfSYPrTuA=",
  };

  sqlQueries += `INSERT INTO Patient SET ${format(fakeData)};\n`;

  if (i % 30000 === 0) console.log(`~ ${i}번 레코드 삽입 완료`);
}

await fs.writeFile("patient.sql", sqlQueries);
console.log("SQL 파일이 성공적으로 저장되었습니다.");
