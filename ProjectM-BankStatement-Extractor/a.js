const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var request = require('request')
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
var cors = require('cors');
const FormData = require('form-data');
// const fetch = require('node-fetch');
const axios = require('axios');

const app=express();
app.use(cors());

// mongoose.connect('mongodb+srv://2021mcb1244:abcd123@cluster0.jxoku9v.mongodb.net/?retryWrites=true&w=majority')

// const userSchema=new mongoose.Schema({
//     clientId:String,
//     transaction:[{
//         account_id:String,
//         name:String,
//         address:String,
//         data:String,
//         currency:String,
//         transaction:Array,
//     }]
// })
// const User=mongoose.model("User",userSchema);

// function stringToNumber(stringValue) {
//     if(typeof stringValue==="string"&&stringValue){

//         const stringWithoutCommas = stringValue.replace(/[^0-9.]/g, '');
//         const numberValue = parseFloat(stringWithoutCommas);
//         return numberValue;
//     }
//     return stringValue;
//   }


// async function getUser(){
//     const users=await User.find();
//     return users;
// }

app.get('/',(req,res)=>{
    // getUser().then((users)=>{
    //     res.send(users);
    // })
    res.send('ok')
})

app.post('/',upload.single('file'),(req,res)=>{
    const clientId=req.body.clientId;
    const pdfFilePath = req.file.path;

    // Read the PDF file as binary data
const form = new FormData();
form.append('pdfFile', fs.createReadStream(pdfFilePath));

const request_config = {
  headers: {
    // 'Authorization': `Bearer ${access_token}`,
    ...form.getHeaders()
  }
};

axios.post('http://127.0.0.1:7000/upload_pdf', form, request_config)
.then(response => {
    res.send(response.data)
    
})
.catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error sending PDF. to Python server' });
});


})


app.listen(4000, function() {
console.log("Server started on port 3000");
})



    