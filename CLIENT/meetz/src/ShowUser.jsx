import React from 'react'
import { useState , useEffect,useRef} from 'react'
import RtlProvider from './RtlProvider'

export default function ShowUser() {
  const [user, setUser] = useState(false);

  useEffect(() => {
        
    initillize()
  },[])
  
  function initillize()
  {
    const temp = JSON.parse(sessionStorage.getItem("User"));
  
     setUser(temp)
  
  }
  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>500?windowWidth.current/2:windowWidth.current
  
  return (
    <RtlProvider>
    <div className='newuser'  style={{width:widthP*0.6,marginTop:'150px',marginBottom:'30px'}}>
         
      <h1>שלום {user.first_name+" "+user.last_name}</h1>
    </div>
  </RtlProvider>
  )
}
