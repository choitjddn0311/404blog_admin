const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/postList' , async (req,res) => {
    try {
        const [rows] = await db.query('SELECT * FROM POST ORDER BY CREATED_AT DESC');
        res.json(rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: '게시글 가져오기 실패'})
    }
})

module.exports = router;