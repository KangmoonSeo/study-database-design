import express from "express";
import { admin } from "../services/admin";

const router = express.Router();

function OK(res, role) {

  res.send(`
  <script>
    alert('저장되었습니다.');
    location.href='/admin/${role}';
  </script>`);
}

router.get("/", async (req, res) => {
  res.redirect("/admin/doctor");
});

// DOCTOR SELECT
router.get("/doctor", async (req, res) => {
  if (req.session.user == null || req.session.user.role != "admin")
    res.redirect("/");
  const data = {
    role: "doctor",
  };
  const doctor_list = await admin.select(data);
  res.render("admin/doctor", {
    doctors: doctor_list,
  });
});

// DOCTOR INSERT
router.post("/doctor", async (req, res) => {
  const data = {
    role: "doctor",
    id: req.body.doctor_id,
    department_id: req.body.department_id,
    name: req.body.name,
    address: req.body.address,
    phone_number: req.body.phone_number,
  };
  await admin.insert(data);
  OK(res, data.role);
});

// DOCTOR UPDATE
router.post("/doctor/:id", async (req, res) => {
  const data = {
    role: "doctor",
    id: req.params.id,
    department_id: req.body.department_id,
    name: req.body.name,
    address: req.body.address,
    phone_number: req.body.phone_number,
  };
  await admin.update(data);
  OK(res, data.role);
});

// DOCTOR DELETE
router.delete("/doctor/:id", async (req, res) => {
  const data = { role: "doctor", id: req.params.id };
  await admin.delete(data);
});

// NURSE SELECT
router.get("/nurse", async (req, res) => {
  if (req.session.user == null || req.session.user.role != "admin")
    res.redirect("/");
  const data = {
    role: "nurse",
  };
  const nurse_list = await admin.select(data);
  res.render("admin/nurse", {
    nurses: nurse_list,
  });
});
// NURSE INSERT
router.post("/nurse", async (req, res) => {
  const data = {
    role: "nurse",
    id: req.body.nurse_id,
    department_id: req.body.department_id,
    name: req.body.name,
    address: req.body.address,
    phone_number: req.body.phone_number,
  };
  await admin.insert(data);

  OK(res, data.role);
});

// NURSE UPDATE
router.post("/nurse/:id", async (req, res) => {
  const data = {
    role: "nurse",
    id: req.params.id,
    department_id: req.body.department_id,
    name: req.body.name,
    address: req.body.address,
    phone_number: req.body.phone_number,
  };
  await admin.update(data);
  OK(res, data.role);
});

// NURSE DELETE
router.delete("/nurse/:id", async (req, res) => {
  const data = { role: "nurse", id: req.params.id };
  const delete_result = await admin.delete(data);
  res.status(delete_result ? 200 : 404);
});

module.exports = router;
