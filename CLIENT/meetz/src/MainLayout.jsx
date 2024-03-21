import { Toolbar } from '@mui/material'
import React from 'react'

export default function MainLayout({children}) {
  return (
    
    <div  style={{display: 'flex', justifyContent: 'center'}} >
 

      {children}
      
    </div>
  )
}
