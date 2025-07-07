const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/userList' , async(req,res) => {
    try {
        const [rows] = await db.query("select * from user order by created_at desc");
        res.json(rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "회원목록 가져오기 실패"})
    }
});

module.exports = router;

