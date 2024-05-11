import React from 'react'
import ImageSlider from './ImageSlider'
import { useState , useEffect,useRef} from 'react'
import {Buffer} from 'buffer';


export default function ProductDetails({ product }) {
  
  const [imageData, setImageData] = useState(product.picture1.data);

  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>800?windowWidth.current/3:windowWidth.current
  const windowHeight = useRef(window.innerHeight);
  const Height =windowHeight.current>800?windowHeight.current/2:windowHeight.current


  const images = [
     `data:${product.picture1.data.contentType};base64,${Buffer.from(product.picture1.data.data).toString('base64')}`,
     
  `data:${product.picture2.data.contentType};base64,${Buffer.from(product.picture2.data.data).toString('base64')}`,
  `data:${product.picture3.data.contentType};base64,${Buffer.from(product.picture3.data.data).toString('base64')}`
    
  ];
  return (
    <div style={{width:widthP,height:Height,display:'inline-block',textAlign:'center'}}  >
      <h2>{product.prodName}</h2>
      <p>{product.description}</p>

      
      <ImageSlider images={images} />
    </div>
  )
}
