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




function App() {
  const windowWidth = useRef(window.innerWidth);

  const [newUser, setNewUser] = useState(1);
  const url=import.meta.env.VITE_URL_BASE
  const[productList, setProductList] = useState([])
  function initillize()
  {
    getProductsList();
 }
  const getProductsList = async () => {
    //const resp = await  axios.get(url+'/getProducts/')
    //console.log(resp)
    //setProductList(resp.data.ProductList)
  }
  useEffect(() => {
    initillize()
  },[])


  return (
    <>
     <Bar />
           <Toolbar/> <Toolbar/>
    <RtlProvider>
  
     {/*<ProductList products={productList}/>
     <NewProduct/>*/}
     <Routes >
     <Route path={'/'} element={<NewProduct />} />
        <Route path={'/SignUp'} element={<SignUp />} />
        <Route path={'/SignIn'} element={<SignInSide />} />
    </Routes>
    <br/><br/>

<footer >
  © כל הזכויות שמורות לאורה רודריגז
  
</footer>
     </RtlProvider>
    
    </>
  )
}

export default App
