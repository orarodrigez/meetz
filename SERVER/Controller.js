
const express=require("express")
const router= express.Router();
const UserBLL=require("./models/UserBLL")
const ProductBLL=require("./models/ProductBLL")
const certHistBLL=require("./models/CertHistBLL")
const multer = require('multer'); // For handling file uploads
const mime = require('mime-types');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');
const fs = require('fs');
var nodemailer = require('nodemailer');
const sharp = require('sharp');



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meetzumeever@gmail.com',
    pass: 'meetzumeever1234'
  }
});

router.use((req, res, next) => {
    checkToken(req,res,next)
})
const checkToken = function (req, res, next)
 {
    var data;

    console.log("url:"+req.originalUrl)
    if(req.originalUrl =="/api/createProduct" || req.originalUrl == "/api/deleteProduct"||req.originalUrl=="/api/upload")
    {
 
        try{
            
            data = jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET); 
           
            if(data.email != "" && data.exp * 1000 > Date.now())
        {
           
            next()
        }
        else
        {
             console.log("2")
             return res.json("Unauthorized")

        }
          
        }
         catch (error) {
          console.log('TokenExpiredError: jwt expired')
          if (error.name === 'TokenExpiredError') {
              return { valid: false, error: 'TokenExpiredError: jwt expired' };
          } else {
              return { valid: false, error: error.message };
          }
      }
      }
      else
      {  
        next()
      
   
    }
 }
 router.post("/checkOtp", async(req,res)=>
{
    
   try {
     const email = req.body.email
     const password = req.body.password
     const AccessToken = jwt.sign({email,password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"7d"}) 
    
   
        if (AccessToken!=null)
        {
        
            console.log("succeed to auth user") 
            console.log(AccessToken)
            return res.json(AccessToken)
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
 
    
})
router.post("/createUser",async(req,res)=>
{
    
   
    //save to mongo - user
    console.log('cell_no='+req.body.cell_no+
    ' email='+req.body.email+
    '  password='+req.body.password+
    '   first_name='+req.body.first_name+
    '  last_name='+req.body.last_name+
    ' city='+req.body.city+
    '  street='+req.body.street+
    '  house_no='+req.body.house_no+
    '  enter_no='+req.body.enter_no+
    ' building='+req.body.building+
    ' zip_id='+req.body.zip_id+
    '  pob='+req.body.pob)
    try {      
        const user= await UserBLL.createUser({cell_no:req.body.cell_no,
          email:req.body.email,
          password:req.body.password,
          first_name:req.body.first_name,
          last_name:req.body.last_name,  
          city:req.body.city,
          street:req.body.street,
          house_no:req.body.house_no,
          enter_no:req.body.enter_no,
          building:req.body.building,
          zip_id:req.body.zip_id,
          pob:req.body.pob})
          console.log(user)       
        if (JSON.stringify(user) === '{}')  
        {
         console.log("user is not done")       
         return res.status(500).json({success: false, msg: 'fail to create user' })
        }
        else
          return res.json(user)
    }
    catch(e) {
        return res.status(500).json({success: false, msg: e.message })
    } 

})


router.post("/checkUser",async(req,res)=>
{
  try {
   
    const user = await UserBLL.checkUserExists({email:req.body.email,password:req.body.password})
  
    if (user)
    {
     
        return res.json(user)
    }
    else
 {
        console.log("fail to find user")
        return res.json(null)
   }
 
}



catch(e) {
    return res.status(500).json({success: false, msg: e.message })
}
})
router.post("/sendNewPwd",async(req,res)=>
{
  try {  
     //send email
        // create random kod
        const tempOTP = Math.floor(Math.random() * 90000) + 10000;
        var user=UserBLL.newPassword({email:email,password:tempOTP})
        if (user!=null)
        {
            var mailOptions = {
              from: 'meetzumeever@gmail.com',
              to: req.body.email,
              subject: 'מעץ ומעבר - איפוס סיסמא',
              text: 'סיסמא חדשה: '+tempOTP
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
        
        }
    
      }



catch(e) {
    return res.status(500).json({success: false, msg: e.message })
}
})
router.post("/checkUserEmail",async(req,res)=>
{
  try {
    console.log(req.body.email)
    const user = await UserBLL.checkUserEmailExist(req.body.email)
    console.log(user)
    if (user)
    {
        console.log(user._id)
        console.log("succeed to auth user")
        return res.json(user)
    }
    else
 {
        console.log("fail to find user")
        return res.json(null)
   }
 
}
catch(e) {
  return res.status(500).json({success: false, msg: e.message })
}
})
router.get("/getProducts", async (req,res) => {
    try
    {
  // console.log("city:" + req.body.P_MUN_DEF)
     const list = await ProductBLL.GetAllProduct()
 if (list != null)
 
    return res.json(list)//res.json({"success": true})//res.json(user)
    }
    catch(e)
    {
      return res.status(500).json({success: false, msg: e.message })
    }
})
router.post("/createProduct", async (req,res) => {
  try{
     
    var P_image1=req.body.img1FileName
    var P_image2=req.body.img2FileName
    var P_image3=req.body.img3FileName
        

     // Read the file as a binary buffer
      const fileBuffer1= fs.readFileSync('Files/'+P_image1);
 
      const fileBuffer11 = await sharp(fileBuffer1).resize(300).toBuffer();
      // Convert the binary buffer to a Base64 encoded string
      const base64String1 = fileBuffer1.toString('base64');
    // Convert base64 to buffer => <Buffer ff d8 ff db 00 43 00 ...

      const fileBuffer2 = fs.readFileSync('Files/'+P_image2); 
      const fileBuffer22 = await sharp(fileBuffer2).resize(300).toBuffer();
      // Convert the binary buffer to a Base64 encoded string
      const base64String2 = fileBuffer2.toString('base64');

      const fileBuffer3 = fs.readFileSync('Files/'+P_image3);
      const fileBuffer33 = await sharp(fileBuffer3).resize(300).toBuffer();  
      // Convert the binary buffer to a Base64 encoded string
      const base64String3 = fileBuffer3.toString('base64');

     const product = await ProductBLL.createProduct({prodName:req.body.prodName,price:req.body.price,
      description:req.body.description,
      picture1:{data:fileBuffer11,content:'image/'+mime.lookup('Files/'+P_image1)},//'image/'+mime.lookup('Files/'+P_image1)},
      picture2:{data:fileBuffer22,content:'image/'+mime.lookup('Files/'+P_image2)},
      picture3:{data:fileBuffer33,content:'image/'+mime.lookup('Files/'+P_image3)},
      stock:req.body.stock})
      if (JSON.stringify(product) === '{}')  
      {
       console.log("product is not done")       
       return res.status(500).json({success: false, msg: 'fail to create product' })
      }
      else
        return res.json(product)
     }
      catch(e)
      {
        return res.status(400).json({ message: e.message });
      }
      finally
      {
       
          fs.unlink('Files/'+P_image1, (err) => {
            if (err) {
              console.error(err);
              console.log("err in file "+P_image1+": "+err.message)
            } else {
              console.log('File is deleted.');
            }
          });
          fs.unlink('Files/'+P_image2, (err) => {
            if (err) {
              console.error(err);
              console.log("err in file "+P_image2+": "+err.message)
            } else {
              console.log('File is deleted.');
            }
          });
          fs.unlink('Files/'+P_image3, (err) => {
            if (err) {
              console.error(err);
              console.log("err in file "+P_image3+": "+err.message)
            } else {
              console.log('File is deleted.');
            }
          });
      }
    
     
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
    destination: './Files',
    filename: (req, file, cb) => {
      if (!file || !file.originalname) {
        return cb(new Error('Invalid file'));
      }
      cb(null, file.originalname); // Use the original filename
    },
  });
  
  const upload = multer({ storage });
 // upload.single('file')
  router.post('/upload', upload.array('file'), async (req, res) => {
    // The uploaded file can be accessed as req.file

    if (!req.files) {
       
      return res.status(400).json({ message: 'No file uploaded' });
     
    } return res.status(200).json({ message: 'File uploaded successfully' });
  });
    module.exports = router;