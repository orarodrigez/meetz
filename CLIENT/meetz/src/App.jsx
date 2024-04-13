import { useState,useEffect,useRef } from 'react'

import './App.css'
import ProductList from './ProductList'
import NewProduct from './NewProduct'
import RtlProvider from './RtlProvider'
import SignInSide from './Sign-in'
import axios from 'axios';
import SignUp from './Sign-up'
import { Routes, Route } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar';
import Bar from './Bar';
import logoImg from './images/logo.png';
import NewPass from './NewPass'
import Cookies from "js-cookie";
import MainLayout from './MainLayout'
import Popover from '@mui/material/Popover';
import ShowUser from './ShowUser'
import ShowCert from './ShortCart'



function App() {
  const windowWidth = useRef(window.innerWidth);

  const [newUser, setNewUser] = useState(false);
  const [oldUser, setOldUser] = useState(null);
  const [newProduct, setNewProduct] = useState(true);
  const url=import.meta.env.VITE_URL_BASE
  const[productList, setProductList] = useState([])
  const [showUser, setShowUser] = useState(null);
  const [showCert, setShowCert] = useState(null);
 

  async function initillize()
  {    
    getProductsList();
   
    const user = await  axios.post(url+'/checkUser/',{email:Cookies.get("email"), password:Cookies.get("password")})   
    
   
      if (user.data!=null) 
      {
      setOldUser(user.data)
        sessionStorage.setItem("User",JSON.stringify({'first_name': user.data.first_name, 'last_name':user.data.last_name,  'cell_no':user.data.cell_no, 'email':user.data.email, 
        'city':user.data.city,    'street':user.data.street,    'house_no':user.data.house_no,    'enter_no':user.data.enter_no,    'building':user.data.building,    'zip_id':user.data.zip_id,    'pob':user.data.pob}))
          try
          {
            
              const token = await  axios.post(url+'/checkOtp/',{email:Cookies.get("email"),password:Cookies.get("password")})   
              localStorage.setItem(Cookies.get("email"),token.data);
             
          }
          catch(e)
          {
              console.log(e)
          }
    }
    else
      setOldUser('')
  }
  const getProductsList = async () => {
    const resp = await  axios.get(url+'/getProducts/')
 
    setProductList(resp.data)
  }
  useEffect(() => {
    initillize()
  },[])

const  callBack= (value) => {
  setShowUser(false)
  setNewProduct(false)
  setNewUser(false)
setShowCert(false)
  if (value=='1')  
    setNewUser(true)  
  else if (value=='2')
    setNewProduct(true)
  else if(value=='4')
    setShowUser(true)
    else if(value=='5')
    setShowCert(true)
    else if(value=='6')
    {setShowUser(false)
      setNewProduct(false)
      setNewUser(false)
    setShowCert(false)}
}

  return (
    <>
    
    { oldUser!=null&&<Bar user={oldUser} callback={callBack}/>}
    <RtlProvider>
    <div  style={{  minHeight: '60vh',  textAlign:'center'}}>

    {!showCert&&!showUser&&!newUser&&productList&&<ProductList products={productList}/>}
     {/*<NewProduct/>*/}
      {/*newProduct&&<MainLayout  children={<NewProduct />}/>*/}
     {newUser&&<MainLayout children={<SignUp callback={callBack}/>}/>}
     {showUser&&<MainLayout  children={<ShowUser/>}/>}
     {showCert&&<MainLayout  children={<ShowCert/>}/>}
     {/*<Routes >
     {<Route path={'/'} element={<ProductList />}/>  }
     <Route path={'/NewPass'} element={<NewPass />} />   
    </Routes>*/}
    <br/><br/>
    </div>
<footer >
  © כל הזכויות שמורות לאורה רודריגז
  
</footer>
     </RtlProvider>
    
    </>
  )
}

export default App
