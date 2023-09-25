import express from 'express';
import { ApplyQuery } from '../database/sql';

const router = express.Router();

router.get('/', (_req, res) => {
    res.render('home', { data: [] });
})

router.post('/', async (req, res) => {
    const vars = req.body;
    const data = {
        Query: vars.Query
    };
    console.log('data\n', data.Query);
    let all_data = [];

    try {
        const result = await ApplyQuery.applyquery(data.Query);
        console.log('result\n', result);

        all_data.push('Query:')
        all_data.push(data.Query)
        all_data.push('Result:')
        for (let i = 0; i < result.length; i++) {
            all_data.push(JSON.stringify(result[i]));
        }
        console.log('all_data\n', all_data);
    } catch (error) {
        console.error('Error:', error.message);
        all_data.push(`${data.Query} is not a query, or there is an error.`);
        all_data.push('Please check.');
    }

    res.render('home', { data: all_data });
})

module.exports = router;