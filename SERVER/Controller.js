
const express=require("express")
const router= express.Router();
const UserBLL=require("./models/UserBLL")
const ProductBLL=require("./models/ProductBLL")
const ShoppingHistBLL=require("./models/CertHistBLL")

const jwt = require('jsonwebtoken')
require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');


router.use((req, res, next) => {
    checkToken(req,res,next)
})
const checkToken = function (req, res, next)
 {
    var data;
  //  console.log("url:"+req.originalUrl)
    if(req.originalUrl =="/getProductByName" || req.originalUrl == "/getProducts")
    {
        next()
    }
    else
    {  
        try{
            //console.log("1")
           // console.log(req.headers.authorization)
            data = jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET);
           // console.log("2")
        }
        catch (e)
        {
           // console.log("3")
           // console.log(JSON.stringify(e))
            return res.json("Unauthorized")
        }
    
    if(data.persId != "0" && data.exp * 1000 > Date.now())
        {
           
            next()
        }
        else
        {
            
            return
        }
    }
 }
 router.post("/checkOtp", async(req,res)=>
{
    
    //check in mongo - by persId and otpCode
     const persId = req.body.persId
     const phone = req.body.phone
     const AccessToken = jwt.sign({persId,phone}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"}) 
     
     //localStorage.setItem(persId, AccessToken);  
     //console.log(AccessToken)
     //const at = localStorage.getItem(persId)
     //console.log("from storage:"+at)
     //const data = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
     //console.log("persId:"+data.persId+" phone:"+data.phone)
     try {
        
        const new_user = await BLLMongo.checkUserExists({persId:persId,phone:phone})
        console.log(new_user)
        if (new_user.otp==req.body.otpCode && Date.now() < new_user.expired)
        {
            console.log(new_user._id)
            console.log("succeed to auth user")
        }
        else
     {
            console.log("fail to auth user")
            return res.status(500).json({success: false, msg: "fail to auth user" } )
       }
    }
    catch(e) {
        return res.status(500).json({success: false, msg: e.message })
    }
    console.log(AccessToken)
     return res.json(AccessToken)
    
})
router.post("/creareOTP",async(req,res)=>
{
    
    //todo: create random kod
   const tempOTP = Math.floor(Math.random() * 90000) + 10000;
   //call -  "https://restapi.soprano.co.il/api/sms"
    //save to mongo - persId, otpCode, exp , phone
    console.log(tempOTP)
    try {      
        const user= await BLLMongo.createUser({persId:req.body.persId,phone:req.body.phone,otp:tempOTP})
        if (JSON.stringify(user) === '{}')  
         console.log("user is not done")       
        else
          console.log("user is done") 
    }
    catch(e) {
        return res.status(500).json({success: false, msg: e.message })
    }
  
    //return ok to client - client open textbox
var jsonObj = {};
jsonObj.UserName = process.env.SMS_OTP_URL_USER//"mtroquik2"; //process.OtpUserName;
jsonObj.Password = process.env.SMS_OTP_URL_PASS//"mtroquik2r4"; //process.OtpPassword
jsonObj.SenderName = process.env.SMS_OTP_URL_SENDERID//"MetroOTPReg";
jsonObj.BodyMessage = "הקוד זמין למשך 5 דקות - " + tempOTP;
jsonObj.Recipients = [];
var jsonSMSTO = {};
jsonSMSTO.Cellphone = req.body.phone;
jsonObj.Recipients.push(jsonSMSTO); 

//await axios.post(process.env.SMS_OTP_URL, jsonObj)

return res.json(tempOTP)
})
router.post("/getProducts", async (req,res) => {
    try
    {
  // console.log("city:" + req.body.P_MUN_DEF)
     const list = await ProductBLL.GetAllProduct()
 
    return res.json(list)//res.json({"success": true})//res.json(user)
    }
    catch(e)
    {
      return res.status(500).json({success: false, msg: e.message })
    }
})
router.post("/createProduct", async (req,res) => {
    // console.log("city:" + req.body.P_MUN_DEF)
     const list = await ProductBLL.GetProductByName(req.prodName)
   
    return res.json(list)//res.json({"success": true})//res.json(user)
     
  })
  router.post("/getProductByName", async (req,res) => {
    // console.log("city:" + req.body.P_MUN_DEF)
     const list = await ProductBLL.GetProductByName(req.prodName)
   
    return res.json(list)//res.json({"success": true})//res.json(user)
     
  })