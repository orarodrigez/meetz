import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom"

import { useState , useEffect,useRef} from 'react'

export default function NewProduct() {
  const navigate = useNavigate()
  const windowWidth = useRef(window.innerWidth);

    const [file, setFile] = useState({})
    const [img1File, setImg1File] = useState({})
    const [img1FileName, setImg1FileName] = useState('')
    const [img2File, setImg2File] = useState({})
    const [img2FileName, setImg2FileName] = useState('')
    const [img3File, setImg3File] = useState({})
    const [img3FileName, setImg3FileName] = useState('')
    const [prodName, setProdName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [stock, setStock] = useState('')
    const url=import.meta.env.VITE_URL_BASE
    
    const handleimg1Upload = (e) => {
        
        const file = e.target.files[0];
       
        setImg1File(file)
        const ext = e.target.files[0].name.split('.').pop();
        const fileName = timeStamp +"_1."+ext;
        setImg1FileName(fileName)
       //setFileList([...fileList, {file:e.target.files[0], newname:fileName}])
       //setFileListNames([...fileListNames,{VALUE_ID:1, VALUE_DESC:fileName}])
       
       
      }
    const handleimg2Upload = (e) => {
        
        const file = e.target.files[0];
       
        setImg2File(file)
        const ext = e.target.files[0].name.split('.').pop();
        const fileName = timeStamp +"_2."+ext;
        setImg2FileName(fileName)
       //setFileList([...fileList, {file:e.target.files[0], newname:fileName}])
       //setFileListNames([...fileListNames,{VALUE_ID:1, VALUE_DESC:fileName}])
       
       
      }
      const handleimg3Upload = (e) => {
        
        const file = e.target.files[0];
       
        setImg3File(file)
        const ext = e.target.files[0].name.split('.').pop();
        const fileName = timeStamp +"_3."+ext;
        setImg3FileName(fileName)
       //setFileList([...fileList, {file:e.target.files[0], newname:fileName}])
       //setFileListNames([...fileListNames,{VALUE_ID:1, VALUE_DESC:fileName}])
       
       
      }
      
      const SaveFiles = async () =>
      {

        const obj = JSON.parse(sessionStorage.getItem("user"));
       
          const token = localStorage.getItem(obj.email)
      
        const formData = new FormData();
        if  (img1File!=null)   
            formData.append('file', img1File.file, img1FileName);
        if  (img2File!=null)   
           formData.append('file', img2File.file, img2FileName); 
        if  (img3File!=null)   
            formData.append('file', img3File.file, img3FileName);
        
      if (formData.values().length==0)
       return;
          try {
           const res = await fetch(url+'/upload', {
              method: 'POST',
              body: formData,
              headers:{'authorization':token}
            });
            //const data = res.json()
            if(res.status == 200)
              {
                alert("הקבצים הועלו בהצלחה")
                setFileLoad(fileLoad=>true)
               
              }
            else{
            alert("תקלה בהעלאת הקבצים")
            setFileLoad(false)
            }
            // Handle the server response
          } catch (error) {
            setFileLoad(false)
            // Handle errors
          }
        
      }

      const save = async () => 
      {
        SaveFiles();
        const prod = {prodName,price,desc,img1File,img2File,img3File,stock}
         
          const token = localStorage.getItem(email)
          //sessionStorage.setItem("RishuyRequest",JSON.stringify(newReq))
          const resp = await  axios.post(url+'/createProduct/',prod,{headers:{'authorization':token}})
    
      }
      const handleChange = (e) => {
         
        var value = e.target.value;
      
       if ( e.target.name=='prodName')
           setProdName(value)
       if ( e.target.name=='stock')       
          setStock(value)      
        if ( e.target.name=='price')
          setPrice(value)
        if ( e.target.name=='description')      
          setDesc(value)

      }
      const widthP=windowWidth.current>500?windowWidth.current/2:windowWidth.current
  return (
    <div className='product' style={{width:widthP*0.6,marginTop:'150px',marginBottom:'30px'}} >
      
      <Box component="form"
       sx={{
        '& > :not(style)': {width:'100%'},
      }}
    >
   <TextField  inputProps={{maxLength: 100}}  style={{maxWidth:widthP*0.5}}   name='prodName'  required label="שם המוצר" variant="outlined" value={prodName}  onChange={handleChange} />          <br/>     <br/>
      <TextField  inputProps={{ maxLength: 100}}  style={{maxWidth:widthP*0.5,fontSize:'16px'}}   required name='description'  label="תיאור המוצר" variant="outlined" value={desc} onChange={handleChange}  />     <br/>     <br/>
        <TextField name= 'stock' label="מלאי"  inputProps={{ maxLength: 6}}  style={{maxWidth:widthP*0.5,fontSize:'16px'}}   value={stock} variant="outlined" onChange={handleChange}  />     <br/>     <br/>
        <TextField name= 'price' label=" מחיר מוצר"  inputProps={{ maxLength: 6}}  style={{maxWidth:widthP*0.5,fontSize:'16px'}}  value={price} variant="outlined" onChange={handleChange}  />     <br/>     <br/>
        </Box>
        <br/>
        <div  >
        <div style={{display:'flex',width:'100%' }}>
            <InputLabel   style={{fontSize:'100%' }}> תמונה1 של מוצר &nbsp; </InputLabel> 
            <Button
                variant="contained"
                component="label"
              >
               בחר קובץ
                <input
                 
                  type="file"
                  hidden
                  onChange={handleimg1Upload}
                />
                
              </Button>
           {img1File&& <InputLabel   style={{fontSize:'100%' }}>&nbsp;{img1File.name} </InputLabel> }</div><br/>
           
    <div style={{display:'flex',width:'100%'}}>
    <InputLabel   style={{fontSize:'100%' }}> תמונה2 של מוצר &nbsp; </InputLabel> 
    <Button
        variant="contained"
        component="label"
      >
       בחר קובץ
        <input
          type="file"
          hidden
          onChange={handleimg2Upload}
        />
        
      </Button>
   {img2File&& <InputLabel   style={{fontSize:'100%' }}>&nbsp;{img2File.name} </InputLabel> }</div><br/>
   <div style={{display:'flex',width:'100%'}}>
    <InputLabel   style={{fontSize:'100%' }}> תמונה3 של מוצר &nbsp; </InputLabel> 
    <Button
        variant="contained"
        component="label"
      >
       בחר קובץ
        <input
         
          type="file"
          hidden
          onChange={handleimg3Upload}
        />
        
      </Button>
   {img2File&& <InputLabel>&nbsp;{img3File.name} </InputLabel> }</div></div><br/>
        <div style={{textAlign:'center'}} ><Button  style={{fontSize:'20px' }} size='medium'  variant="contained" onClick={save}>שמירה</Button></div>
</div>
  );



  }