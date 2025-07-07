const express = require('express');
const app = express();
const cors = require('cors');
const port = 5001;
const userManagementRoute = require('./routes/userManagement');
const postManagementRoute = require('./routes/postManagement');


// app.get('/' , (req,res) => {
//     res.send("hello node.js backend")
// })

app.use(cors({
  origin: `${process.env.REACT_APP_FRONT_URL}`,
  methods: ['GET', 'POST' , 'PUT' , 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/admin' , userManagementRoute);
app.use('/admin' , postManagementRoute);

app.listen(port , '0.0.0.0' , () => {
    console.log(`${port}포트에서 돌아가는중`)
})