import express from 'express';
import { selectSql, deleteSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user != undefined && req.session.user.role === 'super') {
        const department = await selectSql.getDepartment();
        res.render('delete', {
            title: "Delete",
            department,
        });
    } else{
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    console.log("delete :", req.body.delBtn);
    const data = {
        Dnumber: req.body.delBtn,
    };

    await deleteSql.deleteDepartment(data);

    res.redirect('/delete');
});

module.exports = router;

