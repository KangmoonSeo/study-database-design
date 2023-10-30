import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUser();

    users.map((user) => {
        console.log('ID :', user.Id);
        if (vars.id === user.Id && vars.password === user.Password) {
            console.log('login success!');
            req.session.user = { id: user.Id, role: user.Role, checkLogin: true };
        }
    });

    if (req.session.user == undefined) {
        console.log('login failed!');
        res.send(`<script>
                    alert('login failed!');
                    location.href='/';
                </script>`)
    } else if (req.session.user.checkLogin && req.session.user.role === 'super') {
        res.redirect('/delete');
    } else if (req.session.user.checkLogin && req.session.user.role === 'student') {
        res.redirect('/select');
    }
});

module.exports = router;
