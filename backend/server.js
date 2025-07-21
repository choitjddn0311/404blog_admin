const express = require('express');
const app = express();
const cors = require('cors');
const port = 5001;
const userManagementRoute = require('./routes/userManagement');
const postManagementRoute = require('./routes/postManagement');
const genderAmountRoute = require('./routes/getGenderAmount');
const updateUserRoute = require('./routes/updateUserRole');


// app.get('/' , (req,res) => {
//     res.send("hello node.js backend")
// })

app.use(cors({
  origin: `${process.env.REACT_APP_FRONT_URL}`,
  methods: ['GET', 'POST' , 'PUT' , 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());
app.use('/admin' , userManagementRoute);
app.use('/admin' , postManagementRoute);
app.use('/admin' ,genderAmountRoute);
app.use('/admin' , updateUserRoute);


app.listen(port , '0.0.0.0' , () => {
    // console.log(`${port}포트에서 돌아가는중`)
})