import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import bodyParser from  "body-parser";
import Transaction from './models/transaction.js';
import router from './routes/transaction.js'
import AuthApi from './routes/authApi.js'
import userApi from './routes/UserApi.js'
import billsApi from './routes/bills.js'
import passport from 'passport';
import passportConfig from "./config/passport.js"


const app=express();

const port= 4000;
//middleWare
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize());
passportConfig(passport)

app.get('/',(req,res)=>{
    res.send("Hello World");

})
app.use('/transaction',router);
app.use('/auth',AuthApi);
app.use('/bills',billsApi);
// app.use('/user',userApi)

mongoose.connect("mongodb+srv://umangsahu:Umang123@umang.zswrbve.mongodb.net/?retryWrites=true&w=majority").then(()=>{
console.log("mongo db connection is succesfull");})
app.listen (port,()=>{ console.log('server is running');

})