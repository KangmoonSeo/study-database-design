import express from 'express';
import { selectSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } else if (req.session.user.role === 'student' || req.session.user.role === 'super') {
        const department = await selectSql.getDepartment();
        res.render('select', {
            title: "IT Engineering",
            department,
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

