import express from "express";
import logger from "morgan";
import path from "path";
import expressSession from "express-session";

import adminRouter from "../routes/admin";
import doctorRouter from "../routes/doctor";
import nurseRouter from "../routes/nurse";
import searchRouter from "../routes/search";
import patientRouter from "../routes/patient";
import loginRouter from "../routes/login";
// ...

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, "/src")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/nurse", nurseRouter);
app.use("/search", searchRouter);
app.use("/patient", patientRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
