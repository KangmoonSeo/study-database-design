import express from 'express';
import { insertSql } from '../database/sql';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { data: " " });
})

router.post('/', (req, res) => {
    const vars = req.body;

    const data = {
        Id: vars.id,
        Name: vars.name,
        Email: vars.email,
        phone_number: vars.phone_number,
        Major: vars.major,
    };
    insertSql.setStudent(data);
})

module.exports = router;

