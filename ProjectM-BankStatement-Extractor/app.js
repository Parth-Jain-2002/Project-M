const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var request = require('request')
const multer  = require('multer');
var cors = require('cors');
const FormData = require('form-data');
const axios = require('axios');
require('dotenv').config();
const uri=process.env.MONGO_URI

const upload = multer({ dest: 'uploads/' });
const app=express();
app.use(cors());

mongoose.connect(uri)

const userSchema=new mongoose.Schema({
  clientId:String,
  transactions:[{
      account_no:String,
      transaction: Array
  }]
})
const User=mongoose.model("User",userSchema);

//Converts string to number

function stringToNumber(stringValue) {
    if(typeof stringValue==="string"&&stringValue){

        const stringWithoutCommas = stringValue.replace(/[^0-9.]/g, '');
        const numberValue = parseFloat(stringWithoutCommas);
        return numberValue;
    }
    return stringValue;
  }


async function getUser(){
    const users=await User.find();
    return users;
}

//Gets the list of users
app.get('/',(req,res)=>{
    getUser().then((users)=>{
        res.send(users);
    })
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
    ...form.getHeaders()
  }
};

axios.post('http://127.0.0.1:7000/upload_pdf', form, request_config)
.then(response => {
    
    let account_no=response.data.account_no
    
    let transactions_data=response.data.transactions
    
    let transactions=transactions_data.map(transaction=>{
      return {
        date:transaction[0],
        description:transaction[4],
        withdrawals:transaction[1]?stringToNumber(transaction[1]):'',
        deposits:transaction[2]?stringToNumber(transaction[2]):'',
        balance:stringToNumber(transaction[3]),
      }
    })
    
    //stores the transactions in database
    async function run(){
      await User.findOne({clientId:clientId})
      .then(function(foundUser){
          let flag=-1;
          if(foundUser){
              foundUser.transactions.forEach((foundUser)=>{

                  if(foundUser.account_no===account_no){
                      foundUser.transaction=[...foundUser.transaction,...transactions];
                      flag=1;
                  }
              })
              if(flag===-1){
                  foundUser.transactions.push({
                      account_no:account_no,
                      transaction:transactions,
              })}
              foundUser.save();
              
             
          }
          else{
              const user=new User({clientId:clientId,
              transactions:[{
                  account_no:account_no,
                  transaction:transactions,
              }]});
              user.save();
             
             }
          })
        }

        run();

        res.status(200).json({message:'PDF parsed successfully'})
})
//Error handling
.catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error sending PDF to Python server' });
});


})


app.listen(3000, function() {
console.log("Server started on port 3000");
})
