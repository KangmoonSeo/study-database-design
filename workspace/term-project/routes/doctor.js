import express from "express";
import { doctor } from "../services/doctor";

const router = express.Router();

function OK(res) {
  res.send(`
  <script>
    alert('저장되었습니다.');
    location.href='/doctor';
  </script>`);
}

// EXAMINATION
router.get("/", async (req, res) => {
  if (req.session.user === undefined ||req.session.user.role != "doctor") {
    res.redirect("/");
    return;
  }
  const doctor_id = req.session.user.id;
  const data = {
    doctor_id: doctor_id,
  };
  const query_result = await doctor.getExaminations(data);

  res.render("doctor", {
    doctor_id: doctor_id,
    doctor_name: req.session.user.name,
    examinations: query_result,
  });
});

// EXAMINATION INSERT
router.post("/examination", async (req, res) => {
  const data = {
    doctor_id: req.session.user.id,
    patient_id: req.body.patient_id,
    examination_details: req.body.examination_details,
  };
  await doctor.insertExamination(data);
  OK(res);
});

// EXAMINATION UPDATE
router.post("/examination/:date", async (req, res) => {
  const data = {
    patient_id: req.body.patient_id,
    examination_date: req.params.date,
    examination_details: req.body.examination_details,
  };
  await doctor.updateExamination(data);
  OK(res);
});

// EXAMINATION DELETE
router.delete("/examination/:date", async (req, res) => {
  const data = { examination_date: req.params.date };
  await doctor.deleteExamination(data);
});

module.exports = router;
