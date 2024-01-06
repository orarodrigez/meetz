import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './ProductList'
import NewProduct from './NewProduct'
import RtlProvider from './RtlProvider'


function App() {
  const url=import.meta.env.VITE_URL_BASE
  const[productList, setProductList] = useState([])
  function initillize()
  {
    getProductsList();
   }
  const getProductsList = async () => {
    const resp = await  axios.post(url+'/getProducts/')
    setProductList(resp.data)
  }
  useEffect(() => {
    initillize()
  },[])

  return (
    <>
    <RtlProvider>

     {/*<ProductList products={productList}/>*/}
     <NewProduct/>
     </RtlProvider>
    </>
  )
}

export default App
