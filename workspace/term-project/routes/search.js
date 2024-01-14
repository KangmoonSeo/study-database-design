import express from "express";
import { search } from "../services/search";

const router = express.Router();

// SEARCH
router.get("/", async (req, res) => {
  if (
    req.session.user === null ||
    req.session.user === undefined ||
    (req.session.user.role != "doctor" && req.session.user.role != "nurse")
  ) {
    res.redirect("/");
    return;
  }
  console.log("params: ", req.query);

  const searcher_id = req.session.user.id;

  const { patient_id, name, phone_number } = req.query;

  const data = {};
  if (patient_id) data.patient_id = patient_id;
  if (name) data.name = name;
  if (phone_number) data.phone_number = phone_number;

  const query_result = await search.getPatients(data);

  res.render("search", {
    searcher_id: searcher_id,
    searcher_name: req.session.user.name,
    searcher_role: req.session.user.role,
    patients: query_result,
  });
});

module.exports = router;
