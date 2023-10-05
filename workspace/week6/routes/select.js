import express from 'express';
import { selectSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    const Building = await selectSql.getBuilding();
    const Department = await selectSql.getDepartment();
    const Room = await selectSql.getRoom();
    const Student = await selectSql.getStudent();

    res.render('select', {
        main_title: "Tables in InhaDB",
        title1: "Building",
        title2: "Department",
        title3: "Room",
        title4: "Student",
        Building,
        Department,
        Room,
        Student,
    })
})

module.exports = router;

