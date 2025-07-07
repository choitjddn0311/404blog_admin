const express = require('express');
const app = express();
const port = 5001;

app.get('/' , (req,res) => {
    res.send("hello node.js backend")
})

app.listen(port , '0.0.0.0' , () => {
    console.log(`${port}포트에서 돌아가는중`)
})