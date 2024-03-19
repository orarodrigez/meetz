import React from 'react'
import { useState , useEffect,useRef} from 'react'
import RtlProvider from './RtlProvider'

export default function ShortCart(props) {
  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>500?windowWidth.current/2:windowWidth.current
 
  return (
    <div className='showcert' >
      <h2>אין מוצרים בעגלה</h2>
    </div>
  )
}
