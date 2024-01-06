
const express=require("express")
const router= express.Router();
const UserBLL=require("./models/UserBLL")
const ProductBLL=require("./models/ProductBLL")
const certHistBLL=require("./models/CertHistBLL")
const multer = require('multer'); // For handling file uploads
const path = require('path');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');
const fs = require('fs');

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
router.get("/getProducts", async (req,res) => {
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
    var P_image1=req.body.picture1
    var P_image2=req.body.picture2
    var P_image3=req.body.picture3
     // Read the file as a binary buffer
      const fileBuffer1 = fs.readFileSync('Files/'+P_image1.FILE_NAME);
      // Convert the binary buffer to a Base64 encoded string
      const base64String1 = fileBuffer1.toString('base64');
      const fileBuffer2 = fs.readFileSync('Files/'+P_image2.FILE_NAME); 
      // Convert the binary buffer to a Base64 encoded string
      const base64String2 = fileBuffer2.toString('base64');

      const fileBuffer3 = fs.readFileSync('Files/'+P_image3.FILE_NAME);  
      // Convert the binary buffer to a Base64 encoded string
      const base64String3 = fileBuffer3.toString('base64');

     const product = await ProductBLL.createProduct(req.body.prodName,req.body.price,req.body.description,
        {data:base64String1,content:'image/'+P_image1.FILE_TYPE},{data:base64String2,content:'image/'+P_image2.FILE_TYPE},{data:base64String3,content:'image/'+P_image3.FILE_TYPE},req.body.stock)
     fs.unlink('Files/'+P_image1.FILE_NAME)
     fs.unlink('Files/'+P_image2.FILE_NAME)
     fs.unlink('Files/'+P_image3.FILE_NAME)
    return res.json(product)//res.json({"success": true})//res.json(user)
     
  })
  router.post("/deleteProduct", async (req,res,next) => {
   
    var succeed=await ProductBLL.deleteProduct()
    return res.json(succeed)
})
  router.post("/getProductByName", async (req,res,next) => {
    // console.log("city:" + req.body.P_MUN_DEF)
     const list = await ProductBLL.GetProductByName(req.body.prodName)
   
    return res.json(list)//res.json({"success": true})//res.json(user)
     
  })

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Files/'); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename
    },
  });
  
  const upload = multer({ storage });
 // upload.single('file')
  router.post('/upload', upload.single('file'), async(req, res) => {
    // The uploaded file can be accessed as req.file
    
    if (!req.files) {
        console.log('2')
      return res.status(400).json({ message: 'No file uploaded' });
     
    }})
    module.exports = router;