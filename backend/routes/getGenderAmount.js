const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/genderAmount', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END) as male,
                SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) as female,
                SUM(CASE WHEN gender = 'other' THEN 1 ELSE 0 END) as otherCount
            FROM user
        `);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '못가져왔습니다' });
    }
});

module.exports = router;
