import express from "express";
import { nurse } from "../services/nurse";

const router = express.Router();

function OK(res) {
  res.send(`
  <script>
    alert('저장되었습니다.');
    location.href='/nurse';
  </script>`);
}

// TREATMENT
router.get("/", async (req, res) => {
  if (
    req.session.user === null ||
    req.session.user === undefined ||
    req.session.user.role != "nurse"
  ) {
    res.redirect("/");
    return;
  }

  const nurse_id = req.session.user.id;
  const data = {
    nurse_id: nurse_id,
  };
  const query_result = await nurse.getTreatments(data);

  res.render("nurse", {
    nurse_id: nurse_id,
    nurse_name: req.session.user.name,
    treatments: query_result,
  });
});

// TREATMENT INSERT
router.post("/treatment", async (req, res) => {
  const data = {
    nurse_id: req.session.user.id,
    patient_id: req.body.patient_id,
    treatment_details: req.body.treatment_details,
  };
  await nurse.insertTreatment(data);
  OK(res);
});

// TREATMENT UPDATE
router.post("/treatment/:date", async (req, res) => {
  const data = {
    patient_id: req.body.patient_id,
    treatment_date: req.params.date,
    treatment_details: req.body.treatment_details,
  };
  await nurse.updateTreatment(data);
  OK(res);
});

// TREATMENT DELETE
router.delete("/treatment/:date", async (req, res) => {
  const data = { treatment_date: req.params.date };
  await nurse.deleteTreatment(data);
});

module.exports = router;
