import { useState,useEffect,useRef } from 'react'

import './App.css'
import ProductList from './ProductList'
import NewProduct from './NewProduct'
import RtlProvider from './RtlProvider'
import SignInSide from './Sign-in'
import axios from 'axios';
import SignUp from './sign-up'
import { Routes, Route } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar';
import Bar from './Bar';
import logoImg from './images/logo.png';
import NewPass from './NewPass'
import { useCookies } from 'react-cookie';
import MainLayout from './MainLayout'
import Popover from '@mui/material/Popover';





function App() {
  const windowWidth = useRef(window.innerWidth);
  const [cookies, setCookie] = useCookies(['user']);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [oldUser, setOldUser] = useState(false);
  const [newProduct, setNewProduct] = useState(true);
  const url=import.meta.env.VITE_URL_BASE
  const[productList, setProductList] = useState([])

 

  async function initillize()
  {
    getProductsList();
    setEmail(cookies.email);
    setPwd(cookies.pwd);
    const user = await  axios.post(url+'/checkUser/',{email:email, password:pwd}) 
    if (user!=null) 
    sessionStorage.setItem("User",JSON.stringify({'firstName': user.firstName, 'lastName':user.lastName,  'cell_no':user.cell_no, 'email':user.email, 
    'city':user.city,    'street':user.street,    'house_no':user.house_no,    'enter_no':user.enter_no,    'building':user.building,    'zip_id':user.zip_id,    'pob':user.pob}))

  }
  const getProductsList = async () => {
    //const resp = await  axios.get(url+'/getProducts/')
    //console.log(resp)
    //setProductList(resp.data.ProductList)
  }
  useEffect(() => {
    initillize()
  },[])

const  SignIn= (value) => {
  console.log(value)
  if (value==1)
  {
    setNewUser(true)
    setOldUser(false)
    setNewProduct(false)

  }
  else if (value==2)
  {
    setNewUser(false)
    setOldUser(true)
    setNewProduct(false)
  }
  else
  {
    setNewUser(false)
    setOldUser(false)
    setNewProduct(true)
  }
  console.log(newUser)
  console.log(oldUser)
}

  return (
    <>
    
     <Bar  callback={SignIn}/>
    <RtlProvider>
    <div  style={{ minHeight: '60vh',  display: 'flex', justifyContent: 'center',alignItems:'center',textAlign:'center'}}>

     {/*<ProductList products={productList}/>
     <NewProduct/>*/}
      
      {newProduct&&<MainLayout  children={<NewProduct />}/>}
     {!newUser&&oldUser&&<MainLayout  children={<SignInSide callback={SignIn}/>}/>}
     {!oldUser&&newUser&&<MainLayout children={<SignUp callback={SignIn}/>}/>}
    
     <Routes >
     {/*<Route path={'/'} element={<ProductList />}/>  */}
     <Route path={'/NewPass'} element={<NewPass />} />   
    </Routes>
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
