const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.patch('/updateUserRole', async (req, res) => {
    const { userIds, newRole } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0 || !newRole) {
        return res.status(400).json({ error: '잘못된 요청 데이터입니다.' });
    }

    try {
        // userIds 배열 길이만큼 ? 생성
        const placeholders = userIds.map(() => '?').join(',');
        const sql = `UPDATE user SET role = ? WHERE idx IN (${placeholders})`;
        const values = [newRole, ...userIds];

        const [result] = await db.query(sql, values);

        res.json({
            success: true,
            message: `${result.affectedRows}명 업데이트 완료`,
            affectedRows: result.affectedRows
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'DB 업데이트 실패' });
    }
});

router.patch('/updateUserRole', async (req, res) => {
    const { userIds, newRole } = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0 || !newRole) {
        return res.status(400).json({ error: '잘못된 요청 데이터입니다.' });
    }
    try {
        const placeholders = userIds.map(() => '?').join(',');
        const sql = `UPDATE user SET role = ? WHERE idx IN (${placeholders})`;
        const values = [newRole, ...userIds];
        const [result] = await db.query(sql, values);
        res.json({
            success: true,
            message: `${result.affectedRows}명 업데이트 완료`,
            affectedRows: result.affectedRows
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'DB 업데이트 실패' });
    }
});

module.exports = router;
