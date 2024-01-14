import express from "express";
import { patient } from "../services/patient";

const router = express.Router();

function OK(res) {
  res.send(`
  <script>
    alert('저장되었습니다.');
    location.href='/patient';
  </script>`);
}

// RESERVATION
router.get("/", async (req, res) => {
  if (
    req.session.user === null ||
    req.session.user === undefined ||
    req.session.user.role != "patient"
  ) {
    res.redirect("/");
    return;
  }

  const patient_id = req.session.user.id;
  const data = {
    patient_id: patient_id,
  };
  const specialty_result = await patient.getSpecialties();
  const reservation_result = await patient.getReservations(data);

  res.render("patient", {
    patient_id: patient_id,
    patient_name: req.session.user.name,
    specialties: specialty_result,
    reservations: reservation_result,
  });
});

// RESERVATION INSERT
router.post("/reservation", async (req, res) => {
  const data = {
    reservation_number: req.body.reservation_number,
    reservation_date: req.body.reservation_date,
    department_name: req.body.department_name,
    patient_id: req.session.user.id,
  };
  await patient.insertReservation(data);
  OK(res);
});

// RESERVATION DELETE
router.delete("/reservation/:id", async (req, res) => {
  const data = { reservation_number: req.params.id };
  await patient.deleteReservation(data);
});

// INPATIENT
router.get("/inpatient", async (req, res) => {
  if (
    req.session.user === null ||
    req.session.user === undefined ||
    req.session.user.role != "patient"
  ) {
    res.redirect("/");
    return;
  }

  const patient_id = req.session.user.id;
  const data = {
    patient_id: patient_id,
  };
  const inpatient_result = await patient.getInpatients(data);

  console.log(inpatient_result);
  res.render("inpatient", {
    patient_id: patient_id,
    patient_name: req.session.user.name,
    inpatients: inpatient_result,
  });

});

module.exports = router;
